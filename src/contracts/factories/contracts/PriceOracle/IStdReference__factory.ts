/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IStdReference,
  IStdReferenceInterface,
} from "../../../contracts/PriceOracle/IStdReference";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_base",
        type: "string",
      },
      {
        internalType: "string",
        name: "_quote",
        type: "string",
      },
    ],
    name: "getReferenceData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "rate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdatedBase",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdatedQuote",
            type: "uint256",
          },
        ],
        internalType: "struct IStdReference.ReferenceData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_bases",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "_quotes",
        type: "string[]",
      },
    ],
    name: "getReferenceDataBulk",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "rate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdatedBase",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdatedQuote",
            type: "uint256",
          },
        ],
        internalType: "struct IStdReference.ReferenceData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IStdReference__factory {
  static readonly abi = _abi;
  static createInterface(): IStdReferenceInterface {
    return new utils.Interface(_abi) as IStdReferenceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IStdReference {
    return new Contract(address, _abi, signerOrProvider) as IStdReference;
  }
}
