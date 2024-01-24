"use client";

import { useReadClaimKey } from "@/hooks/readContract";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useSignMessage } from "wagmi";
import { claimKey } from "@/hooks/writeContract";
import KeyItem from "@/components/keyItem";
import { KeyItemModel } from "@/components/keyItem/type";

function App() {
  const account = useAccount();
  const { connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const { data: claimedKeyData, refetch } = useReadClaimKey(account.address);
  console.info({ claimedKeyData });

  const handleClickClaim = async () => {
    try {
      if (!account.address) return;
      // sign message
      const signData = await signMessageAsync({ message: "yeah" });
      console.info({ signData });
      const truncatedHexString = signData.substr(2, 64);
      const sign32byte = `0x${truncatedHexString}` as `0x${string}`;

      console.info({ sign32byte });
      // claim key
      const data = await claimKey(sign32byte);
      console.info({ data });

      // refetch
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
          <div>status :{status}</div>
          <div>{error?.message}</div>
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <button
          onClick={() => connect({ connector: injected() })}
          type="button"
        >
          connect
        </button>

        <hr />
        <button onClick={handleClickClaim}>Claim</button>
        <hr />
      </div>

      <div>
        <h2>Claimed Key</h2>
        <div>
          {claimedKeyData?.map((item: KeyItemModel) => (
            <KeyItem key={item.tokenURI} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
