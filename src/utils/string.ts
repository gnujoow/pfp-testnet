import { Address } from "viem";

export function ipfsUriToGatewayUrl(ipfsUri: string): string {
  // reference: https://developers.cloudflare.com/web3/ipfs-gateway/reference/updating-for-ipfs/

  const ipfsHash = ipfsUri.replace('ipfs://', '');

  const gatewayUrl = `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`;

  return gatewayUrl;
}


export function shortenEthereumAddress(address?: Address): string {
  if (!address) {
    return ''
  }


  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);

  return `${prefix}...${suffix}`;
}
