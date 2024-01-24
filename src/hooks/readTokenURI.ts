import { ItemInfo } from "@/components/keyItem/type";
import { ipfsUriToGatewayUrl } from "@/utils/string";
import { instance } from "@/vendor/axios";
import { useQuery } from "@tanstack/react-query";

export const useReadTokenURI = (tokenURI?: string) => {
  return useQuery({
    queryKey: ["tokenURI", tokenURI],
    queryFn: () => instance.get<ItemInfo>(tokenURI as string),
    select: (res) => {
      return {
        ...res,
        image: ipfsUriToGatewayUrl(res.image),
      };
    },
    enabled: tokenURI !== undefined,
  });
};
