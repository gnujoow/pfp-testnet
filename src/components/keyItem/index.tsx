import { FC } from "react";
import { KeyItemModel } from "./type";
import { useReadTokenURI } from "@/hooks/readTokenURI";
import styled from "@emotion/styled";
import { Button } from "../button";
import { Caption2 } from "../typography";

interface KeyItemProps extends KeyItemModel {}
const KeyItem: FC<KeyItemProps> = ({ claimedAt, tokenURI }) => {
  const { data, isLoading } = useReadTokenURI(tokenURI);

  if (isLoading) {
    // todo add loading component
    return <div>loading...</div>;
  }

  if (data) {
    return (
      <Root>
        <img src={data.image} alt="key" />

        <InfoBox>
          <Caption2>claimed : {claimedAt.toString()}</Caption2>
        </InfoBox>
      </Root>
    );
  }
  return null;
};

const Root = styled.div`
  width: 260px;

  img {
    width: 100%;
    aspect-ratio: 1;
    margin-bottom: 10px;
  }
`;

const InfoBox = styled.div`
  padding: 23px 20px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
`;

export default KeyItem;
