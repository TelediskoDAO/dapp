/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TelediskoTokenV2Mock,
  TelediskoTokenV2MockInterface,
} from "../../../contracts/mocks/TelediskoTokenV2Mock";

const _abi = [
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "VestingSet",
    type: "event",
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
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "mintVesting",
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
        internalType: "contract InternalMarket",
        name: "internalMarket",
        type: "address",
      },
    ],
    name: "setInternalMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IRedemptionController",
        name: "redemption",
        type: "address",
      },
    ],
    name: "setRedemptionController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IShareholderRegistry",
        name: "shareholderRegistry",
        type: "address",
      },
    ],
    name: "setShareholderRegistry",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "setVesting",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "vestingBalanceOf",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50600054610100900460ff1615808015620000335750600054600160ff909116105b8062000063575062000050306200013d60201b62000a971760201c565b15801562000063575060005460ff166001145b620000cb5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b6000805460ff191660011790558015620000ef576000805461ff0019166101001790555b801562000136576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b506200014c565b6001600160a01b03163b151590565b611ed9806200015c6000396000f3fe608060405234801561001057600080fd5b50600436106101f05760003560e01c806370a082311161010f578063a217fddf116100a2578063c4d0795111610071578063c4d079511461042d578063d547741f14610440578063dd62ed3e14610453578063fea76b2a1461046657600080fd5b8063a217fddf146103ec578063a260b102146103f4578063a457c2d714610407578063a9059cbb1461041a57600080fd5b80639711715a116100de5780639711715a146103ab578063981b24d0146103b35780639b04e88d146103c65780639dc29fac146103d957600080fd5b806370a082311461035457806391d148541461037d57806395d89b411461039057806396c9ee621461039857600080fd5b806336568abe11610187578063442926001161015657806344292600146103135780634cd88b76146103265780634ee2cd7e146103395780635439ad861461034c57600080fd5b806336568abe146102b157806336ca0365146102c457806339509351146102ed57806340c10f191461030057600080fd5b806323b872dd116101c357806323b872dd14610257578063248a9ca31461026a5780632f2ff15d1461028d578063313ce567146102a257600080fd5b806301ffc9a7146101f557806306fdde031461021d578063095ea7b31461023257806318160ddd14610245575b600080fd5b610208610203366004611902565b610479565b60405190151581526020015b60405180910390f35b6102256104b0565b6040516102149190611958565b6102086102403660046119a0565b610542565b6035545b604051908152602001610214565b6102086102653660046119cc565b61055a565b610249610278366004611a0d565b600090815260a0602052604090206001015490565b6102a061029b366004611a26565b61057e565b005b60405160128152602001610214565b6102a06102bf366004611a26565b6105a8565b6102496102d2366004611a56565b6001600160a01b031660009081526069602052604090205490565b6102086102fb3660046119a0565b61062b565b6102a061030e3660046119a0565b61064d565b6102a06103213660046119a0565b61066f565b6102a0610334366004611b16565b610691565b6102496103473660046119a0565b6107b8565b606a54610249565b610249610362366004611a56565b6001600160a01b031660009081526033602052604090205490565b61020861038b366004611a26565b610811565b61022561083c565b6102a06103a63660046119a0565b61084b565b61024961086d565b6102496103c1366004611a0d565b610895565b6102a06103d4366004611a56565b6108c0565b6102a06103e73660046119a0565b6108f7565b610249600081565b6102a0610402366004611a56565b610919565b6102086104153660046119a0565b610950565b6102086104283660046119a0565b6109cb565b6102a061043b366004611a56565b6109d9565b6102a061044e366004611a26565b610a10565b610249610461366004611b7a565b610a35565b6102a0610474366004611a56565b610a60565b60006001600160e01b03198216637965db0b60e01b14806104aa57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060603680546104bf90611ba8565b80601f01602080910402602001604051908101604052809291908181526020018280546104eb90611ba8565b80156105385780601f1061050d57610100808354040283529160200191610538565b820191906000526020600020905b81548152906001019060200180831161051b57829003601f168201915b5050505050905090565b600033610550818585610aa6565b5060019392505050565b600033610568858285610bca565b610573858585610c44565b506001949350505050565b600082815260a0602052604090206001015461059981610e00565b6105a38383610e0d565b505050565b6001600160a01b038116331461061d5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6106278282610e93565b5050565b60003361055081858561063e8383610a35565b6106489190611bf8565b610aa6565b600080516020611e8483398151915261066581610e00565b6105a38383610efa565b600080516020611e8483398151915261068781610e00565b6105a38383610fcf565b600054610100900460ff16158080156106b15750600054600160ff909116105b806106cb5750303b1580156106cb575060005460ff166001145b61072e5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610614565b6000805460ff191660011790558015610751576000805461ff0019166101001790555b61075b838361105d565b610763611067565b61076e600033611090565b80156105a3576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b6001600160a01b0382166000908152606b60205260408120819081906107df90859061109a565b9150915081610806576001600160a01b038516600090815260336020526040902054610808565b805b95945050505050565b600091825260a0602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6060603780546104bf90611ba8565b600080516020611e6483398151915261086381610e00565b6105a383836110de565b6000600080516020611e8483398151915261088781610e00565b61088f6111ac565b91505090565b60008060006108a584606c61109a565b91509150816108b6576035546108b8565b805b949350505050565b600080516020611e648339815191526108d881610e00565b606880546001600160a01b0319166001600160a01b0384161790555050565b600080516020611e8483398151915261090f81610e00565b6105a383836111ef565b600080516020611e6483398151915261093181610e00565b606780546001600160a01b0319166001600160a01b0384161790555050565b6000338161095e8286610a35565b9050838110156109be5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610614565b6105738286868403610aa6565b600033610550818585610c44565b600080516020611e648339815191526109f181610e00565b606580546001600160a01b0319166001600160a01b0384161790555050565b600082815260a06020526040902060010154610a2b81610e00565b6105a38383610e93565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b600080516020611e64833981519152610a7881610e00565b606680546001600160a01b0319166001600160a01b0384161790555050565b6001600160a01b03163b151590565b6001600160a01b038316610b085760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610614565b6001600160a01b038216610b695760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610614565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610bd68484610a35565b90506000198114610c3e5781811015610c315760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610614565b610c3e8484848403610aa6565b50505050565b6001600160a01b038316610ca85760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610614565b6001600160a01b038216610d0a5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610614565b610d15838383611336565b6001600160a01b03831660009081526033602052604090205481811015610d8d5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610614565b6001600160a01b0380851660008181526033602052604080822086860390559286168082529083902080548601905591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610ded9086815260200190565b60405180910390a3610c3e84848461137e565b610e0a81336114ed565b50565b610e178282610811565b61062757600082815260a0602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610e4f3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610e9d8282610811565b1561062757600082815260a0602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6001600160a01b038216610f505760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610614565b610f5c60008383611336565b8060356000828254610f6e9190611bf8565b90915550506001600160a01b0382166000818152603360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36106276000838361137e565b6001600160a01b03821660009081526069602052604081208054839290610ff7908490611bf8565b9091555061100790508282610efa565b6001600160a01b038216600081815260696020908152604091829020548251938452908301527f90782417eb6da69d0b671119cc8e9c2063c7b0987ef1378141a54770a8c91fb391015b60405180910390a15050565b6106278282611546565b600054610100900460ff1661108e5760405162461bcd60e51b815260040161061490611c10565b565b6106278282610e0d565b600080806110a88585611577565b909350905082156110d6578360010181815481106110c8576110c8611c5b565b906000526020600020015491505b509250929050565b6001600160a01b038216600090815260696020526040902054811061115b5760405162461bcd60e51b815260206004820152602d60248201527f54656c656469736b6f546f6b656e3a2076657374696e672063616e206f6e6c7960448201526c08189948191958dc99585cd959609a1b6064820152608401610614565b6001600160a01b038216600081815260696020908152604091829020849055815192835282018390527f90782417eb6da69d0b671119cc8e9c2063c7b0987ef1378141a54770a8c91fb39101611051565b42606a8190556040519081526000907f8030e83b04d87bef53480e26263266d6ca66863aa8506aca6f2559d18aa1cb679060200160405180910390a150606a5490565b6001600160a01b03821661124f5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610614565b61125b82600083611336565b6001600160a01b038216600090815260336020526040902054818110156112cf5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610614565b6001600160a01b03831660008181526033602090815260408083208686039055603580548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36105a38360008461137e565b60405162461bcd60e51b815260206004820152601d60248201527f54656c656469736b6f546f6b656e56323a206e6f70657479206e6f70650000006044820152606401610614565b606554604051636fb12c5f60e11b81526001600160a01b0385811660048301528481166024830152604482018490529091169063df6258be90606401600060405180830381600087803b1580156113d457600080fd5b505af11580156113e8573d6000803e3d6000fd5b5050506001600160a01b03841690506114625760685460405163228bea5360e21b81526001600160a01b0384811660048301526024820184905290911690638a2fa94c90604401600060405180830381600087803b15801561144957600080fd5b505af115801561145d573d6000803e3d6000fd5b505050505b6001600160a01b03831660009081526069602090815260408083205460339092529091205410156105a35760405162461bcd60e51b815260206004820152602f60248201527f54656c656469736b6f546f6b656e3a207472616e7366657220616d6f756e742060448201526e657863656564732076657374696e6760881b6064820152608401610614565b6114f78282610811565b6106275761150481611645565b61150f836020611657565b604051602001611520929190611c71565b60408051601f198184030181529082905262461bcd60e51b825261061491600401611958565b600054610100900460ff1661156d5760405162461bcd60e51b815260040161061490611c10565b61062782826117fa565b600080600084116115c35760405162461bcd60e51b81526020600482015260166024820152750536e617073686f747461626c653a20696420697320360541b6044820152606401610614565b606a548411156116155760405162461bcd60e51b815260206004820152601d60248201527f536e617073686f747461626c653a206e6f6e6578697374656e742069640000006044820152606401610614565b6000611621848661183a565b845490915081036116375760009250905061163e565b6001925090505b9250929050565b60606104aa6001600160a01b03831660145b60606000611666836002611ce6565b611671906002611bf8565b67ffffffffffffffff81111561168957611689611a73565b6040519080825280601f01601f1916602001820160405280156116b3576020820181803683370190505b509050600360fc1b816000815181106116ce576116ce611c5b565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106116fd576116fd611c5b565b60200101906001600160f81b031916908160001a9053506000611721846002611ce6565b61172c906001611bf8565b90505b60018111156117a4576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061176057611760611c5b565b1a60f81b82828151811061177657611776611c5b565b60200101906001600160f81b031916908160001a90535060049490941c9361179d81611d05565b905061172f565b5083156117f35760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610614565b9392505050565b600054610100900460ff166118215760405162461bcd60e51b815260040161061490611c10565b603661182d8382611d6a565b5060376105a38282611d6a565b8154600090810361184d575060006104aa565b82546000905b8082101561189a57600061186783836118e7565b6000878152602090209091508590820154111561188657809150611894565b611891816001611bf8565b92505b50611853565b6000821180156118c65750836118c3866118b5600186611e2a565b600091825260209091200190565b54145b156118df576118d6600183611e2a565b925050506104aa565b5090506104aa565b60006118f66002848418611e41565b6117f390848416611bf8565b60006020828403121561191457600080fd5b81356001600160e01b0319811681146117f357600080fd5b60005b8381101561194757818101518382015260200161192f565b83811115610c3e5750506000910152565b602081526000825180602084015261197781604085016020870161192c565b601f01601f19169190910160400192915050565b6001600160a01b0381168114610e0a57600080fd5b600080604083850312156119b357600080fd5b82356119be8161198b565b946020939093013593505050565b6000806000606084860312156119e157600080fd5b83356119ec8161198b565b925060208401356119fc8161198b565b929592945050506040919091013590565b600060208284031215611a1f57600080fd5b5035919050565b60008060408385031215611a3957600080fd5b823591506020830135611a4b8161198b565b809150509250929050565b600060208284031215611a6857600080fd5b81356117f38161198b565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611a9a57600080fd5b813567ffffffffffffffff80821115611ab557611ab5611a73565b604051601f8301601f19908116603f01168101908282118183101715611add57611add611a73565b81604052838152866020858801011115611af657600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215611b2957600080fd5b823567ffffffffffffffff80821115611b4157600080fd5b611b4d86838701611a89565b93506020850135915080821115611b6357600080fd5b50611b7085828601611a89565b9150509250929050565b60008060408385031215611b8d57600080fd5b8235611b988161198b565b91506020830135611a4b8161198b565b600181811c90821680611bbc57607f821691505b602082108103611bdc57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611c0b57611c0b611be2565b500190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611ca981601785016020880161192c565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611cda81602884016020880161192c565b01602801949350505050565b6000816000190483118215151615611d0057611d00611be2565b500290565b600081611d1457611d14611be2565b506000190190565b601f8211156105a357600081815260208120601f850160051c81016020861015611d435750805b601f850160051c820191505b81811015611d6257828155600101611d4f565b505050505050565b815167ffffffffffffffff811115611d8457611d84611a73565b611d9881611d928454611ba8565b84611d1c565b602080601f831160018114611dcd5760008415611db55750858301515b600019600386901b1c1916600185901b178555611d62565b600085815260208120601f198616915b82811015611dfc57888601518255948401946001909101908401611ddd565b5085821015611e1a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600082821015611e3c57611e3c611be2565b500390565b600082611e5e57634e487b7160e01b600052601260045260246000fd5b50049056fe97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b9297b97752341782019d21e7c1027eedcd270e56f5b672dcc28d53bf58a346002fca2646970667358221220eddfcb9107a38bd62028843844e8b12b53b27aa2df1e9221e84aad148b2e48fb64736f6c634300080f0033";

type TelediskoTokenV2MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TelediskoTokenV2MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TelediskoTokenV2Mock__factory extends ContractFactory {
  constructor(...args: TelediskoTokenV2MockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TelediskoTokenV2Mock> {
    return super.deploy(overrides || {}) as Promise<TelediskoTokenV2Mock>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TelediskoTokenV2Mock {
    return super.attach(address) as TelediskoTokenV2Mock;
  }
  override connect(signer: Signer): TelediskoTokenV2Mock__factory {
    return super.connect(signer) as TelediskoTokenV2Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TelediskoTokenV2MockInterface {
    return new utils.Interface(_abi) as TelediskoTokenV2MockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TelediskoTokenV2Mock {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TelediskoTokenV2Mock;
  }
}
