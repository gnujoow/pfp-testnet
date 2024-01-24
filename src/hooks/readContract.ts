import { abi } from '@/vendor/abi';
import { Address } from 'viem';
import { useReadContract } from 'wagmi'

export const useReadClaimKey = (account?: Address) => {
  return useReadContract({
    abi,
    address: '0x01B620e6BA56D0C66ED64fC6667C67a6E538D50f',
    functionName: 'claimedKeys',
    account,
    query: {
      enabled: account !== undefined,
    }
  });
}