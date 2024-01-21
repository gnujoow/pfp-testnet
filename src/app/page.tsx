"use client";

import { useReadClaimKey } from "@/hooks/readContract";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: claimedKeyData } = useReadClaimKey();
  console.info({ claimedKeyData });

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
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default App;