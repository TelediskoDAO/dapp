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

export interface ResolutionManagerV2MockInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "addResolutionType(string,uint256,uint256,uint256,bool)": FunctionFragment;
    "approveResolution(uint256)": FunctionFragment;
    "createResolution(string,uint256,bool)": FunctionFragment;
    "getResolutionResult(uint256)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getVoterVote(uint256,address)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "initialize(address,address,address)": FunctionFragment;
    "reinitialize()": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "resolutionTypes(uint256)": FunctionFragment;
    "resolutions(uint256)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setShareholderRegistry(address)": FunctionFragment;
    "setTelediskoToken(address)": FunctionFragment;
    "setVoting(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "updateResolution(uint256,string,uint256,bool)": FunctionFragment;
    "vote(uint256,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_ADMIN_ROLE"
      | "addResolutionType"
      | "approveResolution"
      | "createResolution"
      | "getResolutionResult"
      | "getRoleAdmin"
      | "getVoterVote"
      | "grantRole"
      | "hasRole"
      | "initialize"
      | "reinitialize"
      | "renounceRole"
      | "resolutionTypes"
      | "resolutions"
      | "revokeRole"
      | "setShareholderRegistry"
      | "setTelediskoToken"
      | "setVoting"
      | "supportsInterface"
      | "updateResolution"
      | "vote"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addResolutionType",
    values: [string, BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "approveResolution",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createResolution",
    values: [string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getResolutionResult",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getVoterVote",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "reinitialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "resolutionTypes",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "resolutions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setShareholderRegistry",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setTelediskoToken",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setVoting", values: [string]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateResolution",
    values: [BigNumberish, string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [BigNumberish, boolean]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addResolutionType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveResolution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createResolution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getResolutionResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVoterVote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "reinitialize",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolutionTypes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolutions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setShareholderRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTelediskoToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setVoting", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateResolution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;

  events: {
    "DelegateLostVotingPower(address,uint256,uint256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "ResolutionApproved(address,uint256)": EventFragment;
    "ResolutionCreated(address,uint256)": EventFragment;
    "ResolutionTypeCreated(address,uint256)": EventFragment;
    "ResolutionUpdated(address,uint256)": EventFragment;
    "ResolutionVoted(address,uint256,uint256,bool)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DelegateLostVotingPower"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResolutionApproved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResolutionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResolutionTypeCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResolutionUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResolutionVoted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}

export interface DelegateLostVotingPowerEventObject {
  from: string;
  resolutionId: BigNumber;
  amount: BigNumber;
}
export type DelegateLostVotingPowerEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  DelegateLostVotingPowerEventObject
>;

export type DelegateLostVotingPowerEventFilter =
  TypedEventFilter<DelegateLostVotingPowerEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface ResolutionApprovedEventObject {
  from: string;
  resolutionId: BigNumber;
}
export type ResolutionApprovedEvent = TypedEvent<
  [string, BigNumber],
  ResolutionApprovedEventObject
>;

export type ResolutionApprovedEventFilter =
  TypedEventFilter<ResolutionApprovedEvent>;

export interface ResolutionCreatedEventObject {
  from: string;
  resolutionId: BigNumber;
}
export type ResolutionCreatedEvent = TypedEvent<
  [string, BigNumber],
  ResolutionCreatedEventObject
>;

export type ResolutionCreatedEventFilter =
  TypedEventFilter<ResolutionCreatedEvent>;

export interface ResolutionTypeCreatedEventObject {
  from: string;
  typeIndex: BigNumber;
}
export type ResolutionTypeCreatedEvent = TypedEvent<
  [string, BigNumber],
  ResolutionTypeCreatedEventObject
>;

export type ResolutionTypeCreatedEventFilter =
  TypedEventFilter<ResolutionTypeCreatedEvent>;

export interface ResolutionUpdatedEventObject {
  from: string;
  resolutionId: BigNumber;
}
export type ResolutionUpdatedEvent = TypedEvent<
  [string, BigNumber],
  ResolutionUpdatedEventObject
>;

export type ResolutionUpdatedEventFilter =
  TypedEventFilter<ResolutionUpdatedEvent>;

export interface ResolutionVotedEventObject {
  from: string;
  resolutionId: BigNumber;
  votingPower: BigNumber;
  isYes: boolean;
}
export type ResolutionVotedEvent = TypedEvent<
  [string, BigNumber, BigNumber, boolean],
  ResolutionVotedEventObject
>;

export type ResolutionVotedEventFilter = TypedEventFilter<ResolutionVotedEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface ResolutionManagerV2Mock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ResolutionManagerV2MockInterface;

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
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    addResolutionType(
      name: string,
      quorum: BigNumberish,
      noticePeriod: BigNumberish,
      votingPeriod: BigNumberish,
      canBeNegative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    approveResolution(
      resolutionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createResolution(
      dataURI: string,
      resolutionTypeId: BigNumberish,
      isNegative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getResolutionResult(
      resolutionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    getVoterVote(
      resolutionId: BigNumberish,
      voter: string,
      overrides?: CallOverrides
    ): Promise<
      [boolean, boolean, BigNumber] & {
        isYes: boolean;
        hasVoted: boolean;
        votingPower: BigNumber;
      }
    >;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      shareholderRegistry: string,
      telediskoToken: string,
      voting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    reinitialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    resolutionTypes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, boolean] & {
        name: string;
        quorum: BigNumber;
        noticePeriod: BigNumber;
        votingPeriod: BigNumber;
        canBeNegative: boolean;
      }
    >;

    resolutions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, BigNumber, boolean] & {
        dataURI: string;
        resolutionTypeId: BigNumber;
        approveTimestamp: BigNumber;
        snapshotId: BigNumber;
        yesVotesTotal: BigNumber;
        isNegative: boolean;
      }
    >;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setShareholderRegistry(
      shareholderRegistry: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTelediskoToken(
      telediskoToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setVoting(
      voting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    updateResolution(
      resolutionId: BigNumberish,
      dataURI: string,
      resolutionTypeId: BigNumberish,
      isNegative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vote(
      resolutionId: BigNumberish,
      isYes: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  addResolutionType(
    name: string,
    quorum: BigNumberish,
    noticePeriod: BigNumberish,
    votingPeriod: BigNumberish,
    canBeNegative: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  approveResolution(
    resolutionId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createResolution(
    dataURI: string,
    resolutionTypeId: BigNumberish,
    isNegative: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getResolutionResult(
    resolutionId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  getVoterVote(
    resolutionId: BigNumberish,
    voter: string,
    overrides?: CallOverrides
  ): Promise<
    [boolean, boolean, BigNumber] & {
      isYes: boolean;
      hasVoted: boolean;
      votingPower: BigNumber;
    }
  >;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    shareholderRegistry: string,
    telediskoToken: string,
    voting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  reinitialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  resolutionTypes(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, BigNumber, boolean] & {
      name: string;
      quorum: BigNumber;
      noticePeriod: BigNumber;
      votingPeriod: BigNumber;
      canBeNegative: boolean;
    }
  >;

  resolutions(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, BigNumber, BigNumber, boolean] & {
      dataURI: string;
      resolutionTypeId: BigNumber;
      approveTimestamp: BigNumber;
      snapshotId: BigNumber;
      yesVotesTotal: BigNumber;
      isNegative: boolean;
    }
  >;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setShareholderRegistry(
    shareholderRegistry: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTelediskoToken(
    telediskoToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setVoting(
    voting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  updateResolution(
    resolutionId: BigNumberish,
    dataURI: string,
    resolutionTypeId: BigNumberish,
    isNegative: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vote(
    resolutionId: BigNumberish,
    isYes: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    addResolutionType(
      name: string,
      quorum: BigNumberish,
      noticePeriod: BigNumberish,
      votingPeriod: BigNumberish,
      canBeNegative: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    approveResolution(
      resolutionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createResolution(
      dataURI: string,
      resolutionTypeId: BigNumberish,
      isNegative: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getResolutionResult(
      resolutionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    getVoterVote(
      resolutionId: BigNumberish,
      voter: string,
      overrides?: CallOverrides
    ): Promise<
      [boolean, boolean, BigNumber] & {
        isYes: boolean;
        hasVoted: boolean;
        votingPower: BigNumber;
      }
    >;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      shareholderRegistry: string,
      telediskoToken: string,
      voting: string,
      overrides?: CallOverrides
    ): Promise<void>;

    reinitialize(overrides?: CallOverrides): Promise<void>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    resolutionTypes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, boolean] & {
        name: string;
        quorum: BigNumber;
        noticePeriod: BigNumber;
        votingPeriod: BigNumber;
        canBeNegative: boolean;
      }
    >;

    resolutions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, BigNumber, boolean] & {
        dataURI: string;
        resolutionTypeId: BigNumber;
        approveTimestamp: BigNumber;
        snapshotId: BigNumber;
        yesVotesTotal: BigNumber;
        isNegative: boolean;
      }
    >;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setShareholderRegistry(
      shareholderRegistry: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setTelediskoToken(
      telediskoToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setVoting(voting: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateResolution(
      resolutionId: BigNumberish,
      dataURI: string,
      resolutionTypeId: BigNumberish,
      isNegative: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    vote(
      resolutionId: BigNumberish,
      isYes: boolean,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "DelegateLostVotingPower(address,uint256,uint256)"(
      from?: string | null,
      resolutionId?: BigNumberish | null,
      amount?: null
    ): DelegateLostVotingPowerEventFilter;
    DelegateLostVotingPower(
      from?: string | null,
      resolutionId?: BigNumberish | null,
      amount?: null
    ): DelegateLostVotingPowerEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "ResolutionApproved(address,uint256)"(
      from?: string | null,
      resolutionId?: BigNumberish | null
    ): ResolutionApprovedEventFilter;
    ResolutionApproved(
      from?: string | null,
      resolutionId?: BigNumberish | null
    ): ResolutionApprovedEventFilter;

    "ResolutionCreated(address,uint256)"(
      from?: string | null,
      resolutionId?: BigNumberish | null
    ): ResolutionCreatedEventFilter;
    ResolutionCreated(
      from?: string | null,
      resolutionId?: BigNumberish | null
    ): ResolutionCreatedEventFilter;

    "ResolutionTypeCreated(address,uint256)"(
      from?: string | null,
      typeIndex?: BigNumberish | null
    ): ResolutionTypeCreatedEventFilter;
    ResolutionTypeCreated(
      from?: string | null,
      typeIndex?: BigNumberish | null
    ): ResolutionTypeCreatedEventFilter;

    "ResolutionUpdated(address,uint256)"(
      from?: string | null,
      resolutionId?: BigNumberish | null
    ): ResolutionUpdatedEventFilter;
    ResolutionUpdated(
      from?: string | null,
      resolutionId?: BigNumberish | null
    ): ResolutionUpdatedEventFilter;

    "ResolutionVoted(address,uint256,uint256,bool)"(
      from?: string | null,
      resolutionId?: BigNumberish | null,
      votingPower?: null,
      isYes?: null
    ): ResolutionVotedEventFilter;
    ResolutionVoted(
      from?: string | null,
      resolutionId?: BigNumberish | null,
      votingPower?: null,
      isYes?: null
    ): ResolutionVotedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    addResolutionType(
      name: string,
      quorum: BigNumberish,
      noticePeriod: BigNumberish,
      votingPeriod: BigNumberish,
      canBeNegative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    approveResolution(
      resolutionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createResolution(
      dataURI: string,
      resolutionTypeId: BigNumberish,
      isNegative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getResolutionResult(
      resolutionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVoterVote(
      resolutionId: BigNumberish,
      voter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      shareholderRegistry: string,
      telediskoToken: string,
      voting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    reinitialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    resolutionTypes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    resolutions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setShareholderRegistry(
      shareholderRegistry: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTelediskoToken(
      telediskoToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setVoting(
      voting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateResolution(
      resolutionId: BigNumberish,
      dataURI: string,
      resolutionTypeId: BigNumberish,
      isNegative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vote(
      resolutionId: BigNumberish,
      isYes: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addResolutionType(
      name: string,
      quorum: BigNumberish,
      noticePeriod: BigNumberish,
      votingPeriod: BigNumberish,
      canBeNegative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    approveResolution(
      resolutionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createResolution(
      dataURI: string,
      resolutionTypeId: BigNumberish,
      isNegative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getResolutionResult(
      resolutionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVoterVote(
      resolutionId: BigNumberish,
      voter: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      shareholderRegistry: string,
      telediskoToken: string,
      voting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    reinitialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    resolutionTypes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resolutions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setShareholderRegistry(
      shareholderRegistry: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTelediskoToken(
      telediskoToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setVoting(
      voting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateResolution(
      resolutionId: BigNumberish,
      dataURI: string,
      resolutionTypeId: BigNumberish,
      isNegative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vote(
      resolutionId: BigNumberish,
      isYes: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
