/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface VotingMockInterface extends utils.Interface {
  functions: {
    "afterAddContributor(address)": FunctionFragment;
    "afterTokenTransfer(address,address,uint256)": FunctionFragment;
    "beforeRemoveContributor(address)": FunctionFragment;
    "canVoteAt(address,uint256)": FunctionFragment;
    "getDelegateAt(address,uint256)": FunctionFragment;
    "getTotalVotingPowerAt(uint256)": FunctionFragment;
    "getVotingPowerAt(address,uint256)": FunctionFragment;
    "mock_canVoteAt(address,bool)": FunctionFragment;
    "mock_getDelegateAt(address,address)": FunctionFragment;
    "mock_getTotalVotingPowerAt(uint256)": FunctionFragment;
    "mock_getVotingPowerAt(address,uint256)": FunctionFragment;
    "snapshot()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "afterAddContributor"
      | "afterTokenTransfer"
      | "beforeRemoveContributor"
      | "canVoteAt"
      | "getDelegateAt"
      | "getTotalVotingPowerAt"
      | "getVotingPowerAt"
      | "mock_canVoteAt"
      | "mock_getDelegateAt"
      | "mock_getTotalVotingPowerAt"
      | "mock_getVotingPowerAt"
      | "snapshot"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "afterAddContributor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "afterTokenTransfer",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "beforeRemoveContributor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "canVoteAt",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDelegateAt",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalVotingPowerAt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getVotingPowerAt",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mock_canVoteAt",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "mock_getDelegateAt",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "mock_getTotalVotingPowerAt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mock_getVotingPowerAt",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "snapshot", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "afterAddContributor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "afterTokenTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "beforeRemoveContributor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "canVoteAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDelegateAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalVotingPowerAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVotingPowerAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mock_canVoteAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mock_getDelegateAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mock_getTotalVotingPowerAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mock_getVotingPowerAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "snapshot", data: BytesLike): Result;

  events: {
    "AfterAddContributor(address)": EventFragment;
    "AfterTokenTransferCalled(address,address,uint256)": EventFragment;
    "BeforeRemoveContributor(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AfterAddContributor"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AfterTokenTransferCalled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeforeRemoveContributor"): EventFragment;
}

export interface AfterAddContributorEventObject {
  account: string;
}
export type AfterAddContributorEvent = TypedEvent<
  [string],
  AfterAddContributorEventObject
>;

export type AfterAddContributorEventFilter =
  TypedEventFilter<AfterAddContributorEvent>;

export interface AfterTokenTransferCalledEventObject {
  from: string;
  to: string;
  amount: BigNumber;
}
export type AfterTokenTransferCalledEvent = TypedEvent<
  [string, string, BigNumber],
  AfterTokenTransferCalledEventObject
>;

export type AfterTokenTransferCalledEventFilter =
  TypedEventFilter<AfterTokenTransferCalledEvent>;

export interface BeforeRemoveContributorEventObject {
  account: string;
}
export type BeforeRemoveContributorEvent = TypedEvent<
  [string],
  BeforeRemoveContributorEventObject
>;

export type BeforeRemoveContributorEventFilter =
  TypedEventFilter<BeforeRemoveContributorEvent>;

export interface VotingMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VotingMockInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    afterAddContributor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    afterTokenTransfer(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    beforeRemoveContributor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    canVoteAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getDelegateAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getTotalVotingPowerAt(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getVotingPowerAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    mock_canVoteAt(
      account: string,
      mockResult: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mock_getDelegateAt(
      account: string,
      mockResult: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mock_getTotalVotingPowerAt(
      mockResult: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mock_getVotingPowerAt(
      account: string,
      mockResult: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    snapshot(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  afterAddContributor(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  afterTokenTransfer(
    from: string,
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  beforeRemoveContributor(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  canVoteAt(
    account: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getDelegateAt(
    account: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getTotalVotingPowerAt(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getVotingPowerAt(
    account: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  mock_canVoteAt(
    account: string,
    mockResult: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mock_getDelegateAt(
    account: string,
    mockResult: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mock_getTotalVotingPowerAt(
    mockResult: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mock_getVotingPowerAt(
    account: string,
    mockResult: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  snapshot(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    afterAddContributor(
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    afterTokenTransfer(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    beforeRemoveContributor(
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    canVoteAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getDelegateAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getTotalVotingPowerAt(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVotingPowerAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mock_canVoteAt(
      account: string,
      mockResult: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    mock_getDelegateAt(
      account: string,
      mockResult: string,
      overrides?: CallOverrides
    ): Promise<void>;

    mock_getTotalVotingPowerAt(
      mockResult: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mock_getVotingPowerAt(
      account: string,
      mockResult: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    snapshot(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "AfterAddContributor(address)"(
      account?: null
    ): AfterAddContributorEventFilter;
    AfterAddContributor(account?: null): AfterAddContributorEventFilter;

    "AfterTokenTransferCalled(address,address,uint256)"(
      from?: null,
      to?: null,
      amount?: null
    ): AfterTokenTransferCalledEventFilter;
    AfterTokenTransferCalled(
      from?: null,
      to?: null,
      amount?: null
    ): AfterTokenTransferCalledEventFilter;

    "BeforeRemoveContributor(address)"(
      account?: null
    ): BeforeRemoveContributorEventFilter;
    BeforeRemoveContributor(account?: null): BeforeRemoveContributorEventFilter;
  };

  estimateGas: {
    afterAddContributor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    afterTokenTransfer(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    beforeRemoveContributor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    canVoteAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDelegateAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalVotingPowerAt(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVotingPowerAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mock_canVoteAt(
      account: string,
      mockResult: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mock_getDelegateAt(
      account: string,
      mockResult: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mock_getTotalVotingPowerAt(
      mockResult: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mock_getVotingPowerAt(
      account: string,
      mockResult: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    snapshot(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    afterAddContributor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    afterTokenTransfer(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    beforeRemoveContributor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    canVoteAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDelegateAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalVotingPowerAt(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVotingPowerAt(
      account: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mock_canVoteAt(
      account: string,
      mockResult: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mock_getDelegateAt(
      account: string,
      mockResult: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mock_getTotalVotingPowerAt(
      mockResult: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mock_getVotingPowerAt(
      account: string,
      mockResult: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    snapshot(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
