/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  VotingMock,
  VotingMockInterface,
} from "../../../contracts/mocks/VotingMock";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AfterAddContributor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
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
    name: "AfterTokenTransferCalled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "BeforeRemoveContributor",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "afterAddContributor",
    outputs: [],
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
    name: "afterTokenTransfer",
    outputs: [],
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
    name: "beforeRemoveContributor",
    outputs: [],
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
        name: "",
        type: "uint256",
      },
    ],
    name: "canVoteAt",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "getDelegateAt",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "getTotalVotingPowerAt",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "getVotingPowerAt",
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
        internalType: "bool",
        name: "mockResult",
        type: "bool",
      },
    ],
    name: "mock_canVoteAt",
    outputs: [],
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
        internalType: "address",
        name: "mockResult",
        type: "address",
      },
    ],
    name: "mock_getDelegateAt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mockResult",
        type: "uint256",
      },
    ],
    name: "mock_getTotalVotingPowerAt",
    outputs: [],
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
        name: "mockResult",
        type: "uint256",
      },
    ],
    name: "mock_getVotingPowerAt",
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
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506104ac806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80639711715a116100715780639711715a146101c3578063b652d57b146101ca578063d86f5a0714610207578063df6258be1461021a578063e6c77e1f1461022d578063eaeded5f1461025757600080fd5b80631f992ff2146100b95780633fadf73b146101035780634693feab1461012657806367bc32631461013b578063885991931461014e57806389f6e5ba14610187575b600080fd5b6100e66100c7366004610366565b506001600160a01b039081166000908152602081905260409020541690565b6040516001600160a01b0390911681526020015b60405180910390f35b610118610111366004610390565b5060035490565b6040519081526020016100fa565b6101396101343660046103a9565b610281565b005b610139610149366004610390565b600355565b61013961015c3660046103cb565b6001600160a01b03919091166000908152600260205260409020805460ff1916911515919091179055565b610139610195366004610407565b6001600160a01b03918216600090815260208190526040902080546001600160a01b03191691909216179055565b6000610118565b6101f76101d8366004610366565b506001600160a01b031660009081526002602052604090205460ff1690565b60405190151581526020016100fa565b6101396102153660046103a9565b6102c1565b61013961022836600461043a565b6102fa565b61013961023b366004610366565b6001600160a01b03909116600090815260016020526040902055565b610118610265366004610366565b506001600160a01b031660009081526001602052604090205490565b6040516001600160a01b03821681527fe19852b0eb8ec1bf81a1314d885ae59482d574be25bec5fd7a2dfd84581580ba906020015b60405180910390a150565b6040516001600160a01b03821681527f82a10b65b02caf7d1c7564c55406d22ae17104864deee87877ee849bd382efab906020016102b6565b604080516001600160a01b038086168252841660208201529081018290527f4e3e56fba0bcc16d981be645b84f849cdee4f4dc003ff3d923603ea688f2fb169060600160405180910390a1505050565b80356001600160a01b038116811461036157600080fd5b919050565b6000806040838503121561037957600080fd5b6103828361034a565b946020939093013593505050565b6000602082840312156103a257600080fd5b5035919050565b6000602082840312156103bb57600080fd5b6103c48261034a565b9392505050565b600080604083850312156103de57600080fd5b6103e78361034a565b9150602083013580151581146103fc57600080fd5b809150509250929050565b6000806040838503121561041a57600080fd5b6104238361034a565b91506104316020840161034a565b90509250929050565b60008060006060848603121561044f57600080fd5b6104588461034a565b92506104666020850161034a565b915060408401359050925092509256fea2646970667358221220d0fa180c00bad056f7c3c485b5a5974343d0370447f016f02c2743963931093664736f6c634300080f0033";

type VotingMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VotingMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VotingMock__factory extends ContractFactory {
  constructor(...args: VotingMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<VotingMock> {
    return super.deploy(overrides || {}) as Promise<VotingMock>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): VotingMock {
    return super.attach(address) as VotingMock;
  }
  override connect(signer: Signer): VotingMock__factory {
    return super.connect(signer) as VotingMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VotingMockInterface {
    return new utils.Interface(_abi) as VotingMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VotingMock {
    return new Contract(address, _abi, signerOrProvider) as VotingMock;
  }
}
