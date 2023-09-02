/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ShareholderRegistryBase,
  ShareholderRegistryBaseInterface,
} from "../../../contracts/ShareholderRegistry/ShareholderRegistryBase";

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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506110cd806100206000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80634cd88b76116100a2578063a9059cbb11610071578063a9059cbb14610241578063dd62ed3e14610254578063ed76fff314610267578063efbc89bc14610270578063fe4c7da81461027957600080fd5b80634cd88b76146101e857806370a08231146101fd57806395d89b4114610226578063a457c2d71461022e57600080fd5b806318160ddd116100e957806318160ddd1461018257806323b872dd1461018a57806330ccebb51461019d578063313ce567146101c657806339509351146101d557600080fd5b806306c1c03b1461011b57806306fdde0314610137578063095ea7b31461014c5780630ea018f71461016f575b600080fd5b61012460685481565b6040519081526020015b60405180910390f35b61013f610282565b60405161012e9190610d53565b61015f61015a366004610dc4565b610314565b604051901515815260200161012e565b61015f61017d366004610dee565b61032c565b603554610124565b61015f610198366004610e1a565b610362565b6101246101ab366004610e56565b6001600160a01b03166000908152606a602052604090205490565b6040516012815260200161012e565b61015f6101e3366004610dc4565b610386565b6101fb6101f6366004610f14565b6103a8565b005b61012461020b366004610e56565b6001600160a01b031660009081526033602052604090205490565b61013f610446565b61015f61023c366004610dc4565b610455565b61015f61024f366004610dc4565b6104d5565b610124610262366004610f78565b6104e3565b61012460655481565b61012460675481565b61012460665481565b60606036805461029190610fa2565b80601f01602080910402602001604051908101604052809291908181526020018280546102bd90610fa2565b801561030a5780601f106102df5761010080835404028352916020019161030a565b820191906000526020600020905b8154815290600101906020018083116102ed57829003601f168201915b5050505050905090565b60003361032281858561050e565b5060019392505050565b6001600160a01b038116600090815260336020908152604080832054606a90925282205461035b919085610632565b9392505050565b600033610370858285610679565b61037b8585856106f3565b506001949350505050565b60003361032281858561039983836104e3565b6103a39190610ff3565b61050e565b6103b282826108d2565b50507f307a5ff72e442b798b18d109baae15fe48b6d3690fd14c03015a2f47dd89e2f16065557f14480ae0991a8fe24c1733177e7d71ec79d1f142a7f0e5971a3b930e177598176066557f84d5b933b93417199db826f5da9d5b1189791cb2dfd61240824c7e46b055f03d6067557f1417f6a224499a6e3918f776fd5ff7d6d29c2d693d9862a904be8a74faad51f1606855565b60606037805461029190610fa2565b6000338161046382866104e3565b9050838110156104c85760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61037b828686840361050e565b6000336103228185856106f3565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b6001600160a01b0383166105705760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104bf565b6001600160a01b0382166105d15760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104bf565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60008084118015610671575060665482148061064f575060655482145b8061065957508282145b80610671575060675482148015610671575060685483145b949350505050565b600061068584846104e3565b905060001981146106ed57818110156106e05760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104bf565b6106ed848484840361050e565b50505050565b6001600160a01b0383166107575760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104bf565b6001600160a01b0382166107b95760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104bf565b6107c4838383610907565b6001600160a01b0383166000908152603360205260409020548181101561083c5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104bf565b6001600160a01b03808516600090815260336020526040808220858503905591851681529081208054849290610873908490610ff3565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516108bf91815260200190565b60405180910390a36106ed848484610a54565b600054610100900460ff166108f95760405162461bcd60e51b81526004016104bf9061100b565b6109038282610a7c565b5050565b610919670de0b6b3a764000082611056565b61092b90670de0b6b3a7640000611078565b811461098b5760405162461bcd60e51b815260206004820152602960248201527f5368617265686f6c64657252656769737472793a204e6f206672616374696f6e604482015268616c20746f6b656e7360b81b60648201526084016104bf565b6001600160a01b0382166000908152603360205260409020541580156109b8575080670de0b6b3a7640000145b806109cb57506001600160a01b03821630145b806109dd57506001600160a01b038216155b610a4f5760405162461bcd60e51b815260206004820152603c60248201527f5368617265686f6c64657252656769737472793a204f6e6c792074686520444160448201527f4f2063616e2068617665206d6f7265207468616e20312073686172650000000060648201526084016104bf565b505050565b6001600160a01b038316600090815260336020526040902054610a4f57610a4f600084610aca565b600054610100900460ff16610aa35760405162461bcd60e51b81526004016104bf9061100b565b8151610ab6906036906020850190610cba565b508051610a4f906037906020840190610cba565b811580610ade5750610ade6065548261032c565b610b3d5760405162461bcd60e51b815260206004820152602a60248201527f5368617265686f6c64657252656769737472793a206164647265737320686173604482015269206e6f20746f6b656e7360b01b60648201526084016104bf565b6001600160a01b0381166000908152606a6020526040902054610b61828285610bd0565b6001600160a01b0382166000908152606a60205260409020839055610b87828285610c5f565b60408051828152602081018590526001600160a01b038416917f63d1f3ab699618c7d6d972a3c28f0d08fa090bebc96a34c3a30e5fcda6397ab2910160405180910390a2505050565b610bde600183606754610632565b8015610bf55750610bf3600182606754610632565b155b15610a4f5760695460405163d86f5a0760e01b81526001600160a01b0385811660048301529091169063d86f5a07906024015b600060405180830381600087803b158015610c4257600080fd5b505af1158015610c56573d6000803e3d6000fd5b50505050505050565b610c6d600183606754610632565b158015610c835750610c83600182606754610632565b15610a4f57606954604051634693feab60e01b81526001600160a01b03858116600483015290911690634693feab90602401610c28565b828054610cc690610fa2565b90600052602060002090601f016020900481019282610ce85760008555610d2e565b82601f10610d0157805160ff1916838001178555610d2e565b82800160010185558215610d2e579182015b82811115610d2e578251825591602001919060010190610d13565b50610d3a929150610d3e565b5090565b5b80821115610d3a5760008155600101610d3f565b600060208083528351808285015260005b81811015610d8057858101830151858201604001528201610d64565b81811115610d92576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610dbf57600080fd5b919050565b60008060408385031215610dd757600080fd5b610de083610da8565b946020939093013593505050565b60008060408385031215610e0157600080fd5b82359150610e1160208401610da8565b90509250929050565b600080600060608486031215610e2f57600080fd5b610e3884610da8565b9250610e4660208501610da8565b9150604084013590509250925092565b600060208284031215610e6857600080fd5b61035b82610da8565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610e9857600080fd5b813567ffffffffffffffff80821115610eb357610eb3610e71565b604051601f8301601f19908116603f01168101908282118183101715610edb57610edb610e71565b81604052838152866020858801011115610ef457600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215610f2757600080fd5b823567ffffffffffffffff80821115610f3f57600080fd5b610f4b86838701610e87565b93506020850135915080821115610f6157600080fd5b50610f6e85828601610e87565b9150509250929050565b60008060408385031215610f8b57600080fd5b610f9483610da8565b9150610e1160208401610da8565b600181811c90821680610fb657607f821691505b60208210811415610fd757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561100657611006610fdd565b500190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008261107357634e487b7160e01b600052601260045260246000fd5b500490565b600081600019048311821515161561109257611092610fdd565b50029056fea2646970667358221220a85681973ac4b98240cc47a3463a393e98e9e7bc35094121a8b1bf2eb7b7278964736f6c634300080b0033";

type ShareholderRegistryBaseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ShareholderRegistryBaseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ShareholderRegistryBase__factory extends ContractFactory {
  constructor(...args: ShareholderRegistryBaseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ShareholderRegistryBase> {
    return super.deploy(overrides || {}) as Promise<ShareholderRegistryBase>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ShareholderRegistryBase {
    return super.attach(address) as ShareholderRegistryBase;
  }
  override connect(signer: Signer): ShareholderRegistryBase__factory {
    return super.connect(signer) as ShareholderRegistryBase__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ShareholderRegistryBaseInterface {
    return new utils.Interface(_abi) as ShareholderRegistryBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ShareholderRegistryBase {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ShareholderRegistryBase;
  }
}
