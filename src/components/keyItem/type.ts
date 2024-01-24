import { BlockNumber } from "viem";

export interface KeyItemModel {
  claimedAt: BlockNumber,
  tokenURI: string,
}

export interface ItemInfo {
  name: string,
  image: string, // "ipfs://QmTiZXCudt5FHkh8E7R2vzSYaBc2S8tfaXnZoatgjxyezU",
  description: string,
  universe: number, // 1
  attributes: ItemAttribute[]
  //  [
  //   { "trait_type": "Key type", "value": "G Key (Star Gatherer Key)" },
  //   { "trait_type": "Achievement", "value": "Gathered 1,000 Stars" },
  //   { "trait_type": "Tier", "value": "Ⅰ" }
  // ]
}

interface ItemAttribute {
  "trait_type": string,
  "value": string
}