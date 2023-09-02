/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Roles,
  RolesInterface,
} from "../../../contracts/extensions/Roles";

const _abi = [
  {
    inputs: [],
    name: "ESCROW_ROLE",
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
    name: "OPERATOR_ROLE",
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
    name: "RESOLUTION_ROLE",
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
    name: "SHAREHOLDER_REGISTRY_ROLE",
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
];

const _bytecode =
  "0x61013f61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100565760003560e01c80636ce76f301461005b5780638bd5d19a14610094578063947c1205146100bb578063f5b541a6146100e2575b600080fd5b6100827f2fdac322ee704ce09f0773f7f3f92eb98d5e7c836ee9c056cccd5f61041e5e3f81565b60405190815260200160405180910390f35b6100827fec46be11ac15979aa8ace9d17da41014d9503d92e5a7a20f5753f3af0d7a423081565b6100827f7b97752341782019d21e7c1027eedcd270e56f5b672dcc28d53bf58a346002fc81565b6100827f97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b9298156fea2646970667358221220507f0cb80daeae40ca2d6bdd461d0dd234300624fc540969ccb1a679486ab31e64736f6c634300080b0033";

type RolesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RolesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Roles__factory extends ContractFactory {
  constructor(...args: RolesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Roles> {
    return super.deploy(overrides || {}) as Promise<Roles>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Roles {
    return super.attach(address) as Roles;
  }
  override connect(signer: Signer): Roles__factory {
    return super.connect(signer) as Roles__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RolesInterface {
    return new utils.Interface(_abi) as RolesInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Roles {
    return new Contract(address, _abi, signerOrProvider) as Roles;
  }
}
