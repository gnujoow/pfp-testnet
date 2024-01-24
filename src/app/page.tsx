"use client";

import { useReadClaimKey } from "@/hooks/readContract";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useSignMessage } from "wagmi";
import { claimKey } from "@/hooks/writeContract";
import KeyItem from "@/components/keyItem";
import { KeyItemModel } from "@/components/keyItem/type";
import { Button } from "@/components/button";

import { WalletIcon, ChevronRightIcon } from "@/components/icons";
import styled from "@emotion/styled";
import { Heading5 } from "@/components/typography";

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
        <WalletIcon />
        <ChevronRightIcon />

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
          <Button type="button" onClick={() => disconnect()}>
            Disconnect
          </Button>
        )}
      </div>

      <Section>
        <h2>Mint Keys, Build Identities, Get Rewards</h2>
        <Button
          onClick={() => connect({ connector: injected() })}
          type="button"
        >
          connect
        </Button>
      </Section>

      <Section>
        {/* claim */}
        <Heading5>Available Keys</Heading5>
        <Button onClick={handleClickClaim}>Claim</Button>
      </Section>
      <Section>{/* claimed keys */}</Section>

      <Section>
        <Heading5>Claimed Keys [{claimedKeyData?.length}]</Heading5>
        <div>
          {claimedKeyData?.map((item: KeyItemModel) => (
            <KeyItem key={item.tokenURI} {...item} />
          ))}
        </div>
      </Section>
    </>
  );
}

const Section = styled.section``;

export default App;
