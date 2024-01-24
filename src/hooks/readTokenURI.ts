import { instance } from "@/vendor/axios";
import { useQuery } from "@tanstack/react-query";

export const useReadTokenURI = (tokenURI?: string) => {
  return useQuery({
    queryKey: ['tokenURI', tokenURI],
    queryFn: () => instance.get(tokenURI as string),
    enabled: tokenURI !== undefined,
  })
};