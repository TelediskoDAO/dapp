/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  Snapshottable,
  SnapshottableInterface,
} from "../../../contracts/extensions/Snapshottable";

const _abi = [
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
];

export class Snapshottable__factory {
  static readonly abi = _abi;
  static createInterface(): SnapshottableInterface {
    return new utils.Interface(_abi) as SnapshottableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Snapshottable {
    return new Contract(address, _abi, signerOrProvider) as Snapshottable;
  }
}