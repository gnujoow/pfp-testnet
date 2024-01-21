import { abi } from '@/abi';
import { useReadContract } from 'wagmi'

export const useReadClaimKey = () => {
  return useReadContract({
    abi,
    address: '0x01B620e6BA56D0C66ED64fC6667C67a6E538D50f',
    functionName: 'claimedKeys',
  });
}