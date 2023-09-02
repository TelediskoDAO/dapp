/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ShareholderRegistry,
  ShareholderRegistryInterface,
} from "../../../contracts/ShareholderRegistry/ShareholderRegistry";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "Snapshot",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "previous",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "current",
        type: "bytes32",
      },
    ],
    name: "StatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "CONTRIBUTOR_STATUS",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "INVESTOR_STATUS",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MANAGING_BOARD_STATUS",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SHAREHOLDER_STATUS",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
    ],
    name: "balanceOfAt",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
    ],
    name: "getBalanceAndStatusAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentSnapshotId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getStatus",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
    ],
    name: "getStatusAt",
    outputs: [
      {
        internalType: "bytes32",
        name: "status",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "status",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isAtLeast",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "status",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
    ],
    name: "isAtLeastAt",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "status",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "setStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVoting",
        name: "voting",
        type: "address",
      },
    ],
    name: "setVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "snapshot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
    ],
    name: "totalSupplyAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "recipients",
        type: "address[]",
      },
    ],
    name: "transferFromDAOBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50600062000020600162000087565b9050801562000039576000805461ff0019166101001790555b801562000080576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50620001a8565b60008054610100900460ff161562000120578160ff166001148015620000c05750620000be306200019960201b62000aef1760201c565b155b620001185760405162461bcd60e51b815260206004820152602e60248201526000805160206200254d83398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b506000919050565b60005460ff8084169116106200017f5760405162461bcd60e51b815260206004820152602e60248201526000805160206200254d83398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016200010f565b506000805460ff191660ff92909216919091179055600190565b6001600160a01b03163b151590565b61239580620001b86000396000f3fe608060405234801561001057600080fd5b50600436106102275760003560e01c80634ee2cd7e116101305780639dc29fac116100b8578063d547741f1161007c578063d547741f146104bf578063dd62ed3e146104d2578063ed76fff3146104e5578063efbc89bc146104ee578063fe4c7da8146104f757600080fd5b80639dc29fac1461046b578063a217fddf1461047e578063a457c2d714610486578063a9059cbb14610499578063c4d07951146104ac57600080fd5b806391d14854116100ff57806391d1485414610422578063942ad9301461043557806395d89b41146104485780639711715a14610450578063981b24d01461045857600080fd5b80634ee2cd7e146103cb5780635439ad86146103de57806370a08231146103e65780638bdbbb751461040f57600080fd5b806330ccebb5116101b35780633950935111610182578063395093511461035757806340c10f191461036a5780634b4b35f61461037d5780634baa52cc146103905780634cd88b76146103b857600080fd5b806330ccebb5146102f9578063313ce567146103225780633397cc231461033157806336568abe1461034457600080fd5b80630ea018f7116101fa5780630ea018f71461029357806318160ddd146102a657806323b872dd146102ae578063248a9ca3146102c15780632f2ff15d146102e457600080fd5b806301ffc9a71461022c57806306c1c03b1461025457806306fdde031461026b578063095ea7b314610280575b600080fd5b61023f61023a366004611db0565b610500565b60405190151581526020015b60405180910390f35b61025d60685481565b60405190815260200161024b565b610273610537565b60405161024b9190611e06565b61023f61028e366004611e4e565b6105c9565b61023f6102a1366004611e7a565b6105e1565b60355461025d565b61023f6102bc366004611eaa565b610617565b61025d6102cf366004611eeb565b600090815260a1602052604090206001015490565b6102f76102f2366004611e7a565b61063b565b005b61025d610307366004611f04565b6001600160a01b03166000908152606a602052604090205490565b6040516012815260200161024b565b61025d61033f366004611e4e565b610665565b6102f7610352366004611e7a565b610679565b61023f610365366004611e4e565b6106fc565b6102f7610378366004611e4e565b61071e565b61023f61038b366004611f21565b610740565b6103a361039e366004611e4e565b610768565b6040805192835260208301919091520161024b565b6102f76103c6366004611fff565b61081f565b61025d6103d9366004611e4e565b6108aa565b606b5461025d565b61025d6103f4366004611f04565b6001600160a01b031660009081526033602052604090205490565b6102f761041d366004611e7a565b6108be565b61023f610430366004611e7a565b6108e0565b6102f7610443366004612063565b61090b565b61027361092c565b61025d61093b565b61025d610466366004611eeb565b610964565b6102f7610479366004611e4e565b6109ab565b61025d600081565b61023f610494366004611e4e565b6109cd565b61023f6104a7366004611e4e565b610a48565b6102f76104ba366004611f04565b610a56565b6102f76104cd366004611e7a565b610a9f565b61025d6104e0366004612115565b610ac4565b61025d60655481565b61025d60675481565b61025d60665481565b60006001600160e01b03198216637965db0b60e01b148061053157506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606036805461054690612143565b80601f016020809104026020016040519081016040528092919081815260200182805461057290612143565b80156105bf5780601f10610594576101008083540402835291602001916105bf565b820191906000526020600020905b8154815290600101906020018083116105a257829003601f168201915b5050505050905090565b6000336105d7818585610afe565b5060019392505050565b6001600160a01b038116600090815260336020908152604080832054606a909252822054610610919085610c22565b9392505050565b600033610625858285610c68565b610630858585610ce2565b506001949350505050565b600082815260a1602052604090206001015461065681610ec1565b6106608383610ece565b505050565b60006106718383610768565b949350505050565b6001600160a01b03811633146106ee5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6106f88282610f54565b5050565b6000336105d781858561070f8383610ac4565b6107199190612194565b610afe565b60008051602061234083398151915261073681610ec1565b6106608383610fbb565b600080600061074f8585610768565b9150915061075e828288610c22565b9695505050505050565b6001600160a01b0382166000908152606e602052604081208190818061078e86846110ae565b91509150816107c1576001600160a01b038716600090815260336020908152604080832054606a90925290912054610810565b8260010181815481106107d6576107d66121ac565b9060005260206000209060020201600101548360010182815481106107fd576107fd6121ac565b9060005260206000209060020201600001545b945094505050505b9250929050565b600061082b600161117a565b90508015610843576000805461ff0019166101001790555b61084d8383611202565b6108556112a0565b6108606000336112c9565b8015610660576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b60006108b68383610768565b509392505050565b6000805160206123408339815191526108d681610ec1565b61066083836112d3565b600091825260a1602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60008051602061234083398151915261092381610ec1565b6106f8826113d9565b60606037805461054690612143565b600060008051602061234083398151915261095581610ec1565b61095d61141a565b91505b5090565b6000808061097384606c6110ae565b915091508161098457603554610671565b606d805482908110610998576109986121ac565b9060005260206000200154949350505050565b6000805160206123408339815191526109c381610ec1565b610660838361145d565b600033816109db8286610ac4565b905083811015610a3b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016106e5565b6106308286868403610afe565b6000336105d7818585610ce2565b7f97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929610a8081610ec1565b606980546001600160a01b0319166001600160a01b0384161790555050565b600082815260a16020526040902060010154610aba81610ec1565b6106608383610f54565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b6001600160a01b03163b151590565b6001600160a01b038316610b605760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016106e5565b6001600160a01b038216610bc15760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016106e5565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600080841180156106715750606654821480610c3f575060655482145b80610c4957508282145b8061067157506067548214801561067157506068548314949350505050565b6000610c748484610ac4565b90506000198114610cdc5781811015610ccf5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016106e5565b610cdc8484848403610afe565b50505050565b6001600160a01b038316610d465760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016106e5565b6001600160a01b038216610da85760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016106e5565b610db38383836115be565b6001600160a01b03831660009081526033602052604090205481811015610e2b5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016106e5565b6001600160a01b03808516600090815260336020526040808220858503905591851681529081208054849290610e62908490612194565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610eae91815260200190565b60405180910390a3610cdc848484611611565b610ecb8133611639565b50565b610ed882826108e0565b6106f857600082815260a1602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610f103390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610f5e82826108e0565b156106f857600082815260a1602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6001600160a01b0382166110115760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016106e5565b61101d600083836115be565b806035600082825461102f9190612194565b90915550506001600160a01b0382166000908152603360205260408120805483929061105c908490612194565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a36106f860008383611611565b600080600084116110fa5760405162461bcd60e51b81526020600482015260166024820152750536e617073686f747461626c653a20696420697320360541b60448201526064016106e5565b606b5484111561114c5760405162461bcd60e51b815260206004820152601d60248201527f536e617073686f747461626c653a206e6f6e6578697374656e7420696400000060448201526064016106e5565b6000611158848661169d565b845490915081141561116f57600092509050610818565b600192509050610818565b60008054610100900460ff16156111c1578160ff16600114801561119d5750303b155b6111b95760405162461bcd60e51b81526004016106e5906121c2565b506000919050565b60005460ff8084169116106111e85760405162461bcd60e51b81526004016106e5906121c2565b506000805460ff191660ff92909216919091179055600190565b61120c8282611760565b50507f307a5ff72e442b798b18d109baae15fe48b6d3690fd14c03015a2f47dd89e2f16065557f14480ae0991a8fe24c1733177e7d71ec79d1f142a7f0e5971a3b930e177598176066557f84d5b933b93417199db826f5da9d5b1189791cb2dfd61240824c7e46b055f03d6067557f1417f6a224499a6e3918f776fd5ff7d6d29c2d693d9862a904be8a74faad51f1606855565b600054610100900460ff166112c75760405162461bcd60e51b81526004016106e590612210565b565b6106f88282610ece565b8115806112e757506112e7606554826105e1565b6113465760405162461bcd60e51b815260206004820152602a60248201527f5368617265686f6c64657252656769737472793a206164647265737320686173604482015269206e6f20746f6b656e7360b01b60648201526084016106e5565b6001600160a01b0381166000908152606a602052604090205461136a828285611791565b6001600160a01b0382166000908152606a602052604090208390556113908282856117a5565b60408051828152602081018590526001600160a01b038416917f63d1f3ab699618c7d6d972a3c28f0d08fa090bebc96a34c3a30e5fcda6397ab2910160405180910390a2505050565b805160005b8181101561066057611412308483815181106113fc576113fc6121ac565b6020026020010151670de0b6b3a7640000610ce2565b6001016113de565b42606b8190556040519081526000907f8030e83b04d87bef53480e26263266d6ca66863aa8506aca6f2559d18aa1cb679060200160405180910390a150606b5490565b6001600160a01b0382166114bd5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016106e5565b6114c9826000836115be565b6001600160a01b0382166000908152603360205260409020548181101561153d5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016106e5565b6001600160a01b038316600090815260336020526040812083830390556035805484929061156c90849061225b565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a361066083600084611611565b6115c9838383611833565b6001600160a01b0383166115e8576115e08261197b565b610660611a20565b6001600160a01b0382166115ff576115e08361197b565b6116088361197b565b6106608261197b565b6001600160a01b038316600090815260336020526040902054610660576106606000846112d3565b61164382826108e0565b6106f85761165b816001600160a01b03166014611a7c565b611666836020611a7c565b604051602001611677929190612272565b60408051601f198184030181529082905262461bcd60e51b82526106e591600401611e06565b81546000906116ae57506000610531565b82546000905b8082101561170a5760006116c88383611c18565b9050848682815481106116dd576116dd6121ac565b906000526020600020015411156116f657809150611704565b611701816001612194565b92505b506116b4565b60008211801561173f5750838561172260018561225b565b81548110611732576117326121ac565b9060005260206000200154145b156117585761174f60018361225b565b92505050610531565b509050610531565b600054610100900460ff166117875760405162461bcd60e51b81526004016106e590612210565b6106f88282611c33565b61179c838383611c81565b6106608361197b565b6117b3600183606754610c22565b1580156117c957506117c9600182606754610c22565b1561066057606954604051634693feab60e01b81526001600160a01b03858116600483015290911690634693feab906024015b600060405180830381600087803b15801561181657600080fd5b505af115801561182a573d6000803e3d6000fd5b50505050505050565b611845670de0b6b3a7640000826122e7565b61185790670de0b6b3a7640000612309565b81146118b75760405162461bcd60e51b815260206004820152602960248201527f5368617265686f6c64657252656769737472793a204e6f206672616374696f6e604482015268616c20746f6b656e7360b81b60648201526084016106e5565b6001600160a01b0382166000908152603360205260409020541580156118e4575080670de0b6b3a7640000145b806118f757506001600160a01b03821630145b8061190957506001600160a01b038216155b6106605760405162461bcd60e51b815260206004820152603c60248201527f5368617265686f6c64657252656769737472793a204f6e6c792074686520444160448201527f4f2063616e2068617665206d6f7265207468616e20312073686172650000000060648201526084016106e5565b6000611986606b5490565b6001600160a01b0383166000908152606e60205260409020909150816119ab82611cdd565b10156106605780546001808201835560008381526020808220909301949094556040805180820182526001600160a01b0396909616808652606a845281862054875285526033835284205485830190815292810180548083018255908552919093209351600290910290930192835551910155565b6000611a2b606b5490565b9050606c81611a3982611cdd565b10156106f8578054600181810183556000838152602090209091018390558101611a6260355490565b815460018101835560009283526020909220909101555050565b60606000611a8b836002612309565b611a96906002612194565b67ffffffffffffffff811115611aae57611aae611f48565b6040519080825280601f01601f191660200182016040528015611ad8576020820181803683370190505b509050600360fc1b81600081518110611af357611af36121ac565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611b2257611b226121ac565b60200101906001600160f81b031916908160001a9053506000611b46846002612309565b611b51906001612194565b90505b6001811115611bc9576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611b8557611b856121ac565b1a60f81b828281518110611b9b57611b9b6121ac565b60200101906001600160f81b031916908160001a90535060049490941c93611bc281612328565b9050611b54565b5083156106105760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016106e5565b6000611c2760028484186122e7565b61061090848416612194565b600054610100900460ff16611c5a5760405162461bcd60e51b81526004016106e590612210565b8151611c6d906036906020850190611d20565b508051610660906037906020840190611d20565b611c8f600183606754610c22565b8015611ca65750611ca4600182606754610c22565b155b156106605760695460405163d86f5a0760e01b81526001600160a01b0385811660048301529091169063d86f5a07906024016117fc565b8054600090611cee57506000919050565b81548290611cfe9060019061225b565b81548110611d0e57611d0e6121ac565b90600052602060002001549050919050565b828054611d2c90612143565b90600052602060002090601f016020900481019282611d4e5760008555611d94565b82601f10611d6757805160ff1916838001178555611d94565b82800160010185558215611d94579182015b82811115611d94578251825591602001919060010190611d79565b506109609291505b808211156109605760008155600101611d9c565b600060208284031215611dc257600080fd5b81356001600160e01b03198116811461061057600080fd5b60005b83811015611df5578181015183820152602001611ddd565b83811115610cdc5750506000910152565b6020815260008251806020840152611e25816040850160208701611dda565b601f01601f19169190910160400192915050565b6001600160a01b0381168114610ecb57600080fd5b60008060408385031215611e6157600080fd5b8235611e6c81611e39565b946020939093013593505050565b60008060408385031215611e8d57600080fd5b823591506020830135611e9f81611e39565b809150509250929050565b600080600060608486031215611ebf57600080fd5b8335611eca81611e39565b92506020840135611eda81611e39565b929592945050506040919091013590565b600060208284031215611efd57600080fd5b5035919050565b600060208284031215611f1657600080fd5b813561061081611e39565b600080600060608486031215611f3657600080fd5b833592506020840135611eda81611e39565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611f8757611f87611f48565b604052919050565b600082601f830112611fa057600080fd5b813567ffffffffffffffff811115611fba57611fba611f48565b611fcd601f8201601f1916602001611f5e565b818152846020838601011115611fe257600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561201257600080fd5b823567ffffffffffffffff8082111561202a57600080fd5b61203686838701611f8f565b9350602085013591508082111561204c57600080fd5b5061205985828601611f8f565b9150509250929050565b6000602080838503121561207657600080fd5b823567ffffffffffffffff8082111561208e57600080fd5b818501915085601f8301126120a257600080fd5b8135818111156120b4576120b4611f48565b8060051b91506120c5848301611f5e565b81815291830184019184810190888411156120df57600080fd5b938501935b8385101561210957843592506120f983611e39565b82825293850193908501906120e4565b98975050505050505050565b6000806040838503121561212857600080fd5b823561213381611e39565b91506020830135611e9f81611e39565b600181811c9082168061215757607f821691505b6020821081141561217857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156121a7576121a761217e565b500190565b634e487b7160e01b600052603260045260246000fd5b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008282101561226d5761226d61217e565b500390565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516122aa816017850160208801611dda565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516122db816028840160208801611dda565b01602801949350505050565b60008261230457634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156123235761232361217e565b500290565b6000816123375761233761217e565b50600019019056fe7b97752341782019d21e7c1027eedcd270e56f5b672dcc28d53bf58a346002fca264697066735822122095ea805aa307ab8ca99108781217b20ed4a1bb8dfc02d60874b02984537568ed64736f6c634300080b0033496e697469616c697a61626c653a20636f6e747261637420697320616c726561";

type ShareholderRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ShareholderRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ShareholderRegistry__factory extends ContractFactory {
  constructor(...args: ShareholderRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ShareholderRegistry> {
    return super.deploy(overrides || {}) as Promise<ShareholderRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ShareholderRegistry {
    return super.attach(address) as ShareholderRegistry;
  }
  override connect(signer: Signer): ShareholderRegistry__factory {
    return super.connect(signer) as ShareholderRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ShareholderRegistryInterface {
    return new utils.Interface(_abi) as ShareholderRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ShareholderRegistry {
    return new Contract(address, _abi, signerOrProvider) as ShareholderRegistry;
  }
}
