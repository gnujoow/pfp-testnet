export const abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "signature",
        type: "bytes32",
      },
    ],
    name: "claimKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimedKeys",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "claimedAt",
            type: "uint256",
          },
        ],
        internalType: "struct TaskForNew.Key[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
