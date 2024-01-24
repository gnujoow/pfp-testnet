import { useAccount, useDisconnect } from "wagmi";
import { WalletIcon } from "../icons";
import styled from "@emotion/styled";
import { shortenEthereumAddress } from "@/utils/string";
import { Caption1 } from "../typography";

/**
 * 지갑 연결 상태와 주소를 보여준다.
 */
const StatusBar = () => {
  const { isConnected, address } = useAccount();

  if (!isConnected) return null;

  return (
    <Root>
      <WalletIcon />
      <Caption1>{shortenEthereumAddress(address)}</Caption1>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

export default StatusBar;
