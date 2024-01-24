/** @jsxImportSource @emotion/react */

import { useAccount, useDisconnect } from "wagmi";
import { WalletIcon } from "../icons";
import styled from "@emotion/styled";
import { shortenEthereumAddress } from "@/utils/string";
import { Caption1 } from "../typography";
import { css } from "@emotion/react";
import colors from "@/style/colors";

/**
 * 지갑 연결 상태와 주소를 보여준다.
 */
const StatusBar = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) return null;

  return (
    <Root
      onClick={() => {
        disconnect();
      }}
    >
      <WalletIcon />
      <Caption1
        css={css`
          color: ${colors.primary};
        `}
      >
        {shortenEthereumAddress(address)}
      </Caption1>
    </Root>
  );
};

const Root = styled.div`
  cursor: not-allowed;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

export default StatusBar;
