/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  InternalMarketBase,
  InternalMarketBaseInterface,
} from "../../../contracts/InternalMarket/InternalMarketBase";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint128",
        name: "id",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    name: "OfferCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint128",
        name: "id",
        type: "uint128",
      },
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
    name: "OfferMatched",
    type: "event",
  },
  {
    inputs: [],
    name: "daoToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "offerDuration",
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
    ],
    name: "offeredBalanceOf",
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
    name: "priceOracle",
    outputs: [
      {
        internalType: "contract IStdReference",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "redemptionController",
    outputs: [
      {
        internalType: "contract IRedemptionController",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reserve",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "withdrawableBalanceOf",
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
  "0x608060405234801561001057600080fd5b506102ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063a25eb5d91161005b578063a25eb5d914610104578063bd62869a14610117578063cd3293de14610120578063cfe63ddf1461013357600080fd5b80632630c12f1461008d5780633aa6c4f9146100bd5780634914b030146100de5780639d5320f4146100f1575b600080fd5b6003546100a0906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100d06100cb36600461021e565b610146565b6040519081526020016100b4565b6000546100a0906001600160a01b031681565b6002546100a0906001600160a01b031681565b6001546100a0906001600160a01b031681565b6100d060055481565b6004546100a0906001600160a01b031681565b6100d061014136600461021e565b61015a565b6000806101528361016e565b949350505050565b6000806101668361016e565b509392505050565b6001600160a01b0381166000908152600660209081526040808320600790925282205481548392919083906001600160801b03165b83546001600160801b03600160801b90910481169082161015610208576001600160801b0381166000908152600185016020526040902080544211156101f55760018101546101f29084610264565b92505b50806102008161027c565b9150506101a3565b5061021381836102a2565b969095509350505050565b60006020828403121561023057600080fd5b81356001600160a01b038116811461024757600080fd5b9392505050565b634e487b7160e01b600052601160045260246000fd5b600082198211156102775761027761024e565b500190565b60006001600160801b038083168181036102985761029861024e565b6001019392505050565b6000828210156102b4576102b461024e565b50039056fea26469706673582212204738d53df2fa53ef9e6c001ce54395567f7994b781e12e65746e0e3a97e40cd264736f6c634300080f0033";

type InternalMarketBaseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: InternalMarketBaseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class InternalMarketBase__factory extends ContractFactory {
  constructor(...args: InternalMarketBaseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<InternalMarketBase> {
    return super.deploy(overrides || {}) as Promise<InternalMarketBase>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): InternalMarketBase {
    return super.attach(address) as InternalMarketBase;
  }
  override connect(signer: Signer): InternalMarketBase__factory {
    return super.connect(signer) as InternalMarketBase__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InternalMarketBaseInterface {
    return new utils.Interface(_abi) as InternalMarketBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InternalMarketBase {
    return new Contract(address, _abi, signerOrProvider) as InternalMarketBase;
  }
}