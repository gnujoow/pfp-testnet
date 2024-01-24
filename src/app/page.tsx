"use client";
/** @jsxImportSource @emotion/react */

import { useReadClaimKey } from "@/hooks/readContract";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useSignMessage } from "wagmi";
import { claimKey } from "@/hooks/writeContract";
import KeyItem from "@/components/keyItem";
import { KeyItemModel } from "@/components/keyItem/type";
import { Button } from "@/components/button";

import styled from "@emotion/styled";
import { Caption1, Heading5 } from "@/components/typography";
import StatusBar from "@/components/statusBar";
import { Global, css } from "@emotion/react";
import { instance } from "@/vendor/axios";

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { signMessageAsync } = useSignMessage();

  const { data: claimedKeyData, refetch } = useReadClaimKey(address);

  const handleClickClaim = async () => {
    try {
      if (!address) return;

      // please refer to /api/routes.ts
      const res = await instance.post("/api", { address });
      const { message } = res as any;
      const data = await claimKey(message);
      console.info({ data });

      // refetch
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickConnect = () => {
    connect({ connector: injected() });
  };

  return (
    <>
      <Global
        styles={css`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p {
            margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
          }
        `}
      />

      <Container>
        <StatusBar />

        <Section>
          <h2>Mint Keys, Build Identities, Get Rewards</h2>
          {!isConnected && (
            <Button onClick={handleClickConnect} type="button">
              connect
            </Button>
          )}
        </Section>

        {isConnected && (
          <>
            {/* claim */}
            <Section>
              <SectionHeading>Available Keys</SectionHeading>
              <ItemBox>
                <img
                  src="https://cloudflare-ipfs.com/ipfs/QmTiZXCudt5FHkh8E7R2vzSYaBc2S8tfaXnZoatgjxyezU"
                  alt=""
                />
                <Button fullWidth onClick={handleClickClaim}>
                  Claim
                </Button>
              </ItemBox>

              <Caption1
                css={css`
                  margin-top: 24px;
                `}
              >
                more Keys to be added
              </Caption1>
            </Section>

            {/* claimed section */}
            <Section>
              <SectionHeading>
                Claimed Keys [{claimedKeyData?.length}]
              </SectionHeading>
              <ItemGrid>
                {claimedKeyData?.map((item: KeyItemModel) => (
                  <KeyItem key={item.tokenURI} {...item} />
                ))}
              </ItemGrid>
            </Section>
          </>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 50px;
`;

const ItemBox = styled.div`
  width: 260px;
  img {
    width: 100%;
    aspect-ratio: 1;
    margin-bottom: 10px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 60px;
`;

const SectionHeading = styled(Heading5)`
  font-family: var(--font-quantico);
  margin-bottom: 66px;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

export default App;
