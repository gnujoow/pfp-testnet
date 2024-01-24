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
    return (
      <div>
        {claimedAt.toString()}
        <img src={data.image} alt="key" />
        <div>{data.name}</div>
        <div>{data.description}</div>
        <div>{data.universe}</div>
        <div>
          {data.attributes.map((attr) => (
            <div>
              {attr.trait_type}: {attr.value}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default KeyItem;
