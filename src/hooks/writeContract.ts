import { abi } from '@/vendor/abi'
import { config } from '@/wagmi'
import { writeContract } from '@wagmi/core'

export const claimKey = (args: `0x${string}`) => {
  return writeContract(config, {
    abi,
    address: '0x01B620e6BA56D0C66ED64fC6667C67a6E538D50f',
    functionName: 'claimKey',
    args: [args],
  })
}