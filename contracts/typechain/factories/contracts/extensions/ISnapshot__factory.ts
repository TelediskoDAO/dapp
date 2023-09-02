/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISnapshot,
  ISnapshotInterface,
} from "../../../contracts/extensions/ISnapshot";

const _abi = [
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
] as const;

export class ISnapshot__factory {
  static readonly abi = _abi;
  static createInterface(): ISnapshotInterface {
    return new utils.Interface(_abi) as ISnapshotInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISnapshot {
    return new Contract(address, _abi, signerOrProvider) as ISnapshot;
  }
}
