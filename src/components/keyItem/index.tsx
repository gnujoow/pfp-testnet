import { FC } from "react";
import { KeyItemModel } from "./type";
import { useReadTokenURI } from "@/hooks/readTokenURI";

interface KeyItemProps extends KeyItemModel {}
const KeyItem: FC<KeyItemProps> = ({ claimedAt, tokenURI }) => {
  const { data, isLoading } = useReadTokenURI(tokenURI);

  if (isLoading) {
    // todo add loading component
    return <div>loading...</div>;
  }

  if (data) {
    return <div>{claimedAt.toString()}</div>;
  }
  return null;
};

export default KeyItem;
