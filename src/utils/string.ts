export function ipfsUriToGatewayUrl(ipfsUri: string): string {
  // reference: https://developers.cloudflare.com/web3/ipfs-gateway/reference/updating-for-ipfs/

  const ipfsHash = ipfsUri.replace('ipfs://', '');

  const gatewayUrl = `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`;

  return gatewayUrl;
}
