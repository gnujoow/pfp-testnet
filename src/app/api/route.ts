import { NextResponse } from 'next/server';
import { isAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

export async function POST(request: Request) {
  const res = await request.json();
  const { address } = res;
  
  if (!isAddress(address)) {
    return NextResponse.json({ message: `invalid address ${address}`, request }, { status: 400 });
  }

  const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')
  const signData = await account.signMessage({ message: address });
  const truncatedHexString = signData.substr(2, 64);
  const sign32byte = `0x${truncatedHexString}` as `0x${string}`;
  
  return NextResponse.json({ message: sign32byte }, { status: 200 });
}

