export type ResolutionVoter = {
  id: string;
  votingPower: number;
  address: string;
  hasVoted: boolean;
  hasVotedYes: boolean;
  delegated: string;
};

export type ResolutionsAcl = {
  canCreate: boolean;
  canUpdate: boolean;
  canApprove: boolean;
  canVote: (voters: ResolutionVoter[]) => boolean;
  loaded: boolean;
};

export type ResolutionTypeEntity = {
  id: string;
  name: string;
  quorum: string;
  noticePeriod: string;
  votingPeriod: string;
  canBeNegative: boolean;
};

export type DaoManagerEntity = {
  id: string;
  contributorsAddresses: string[];
  managingBoardAddresses: string[];
  shareholdersAddresses: string[];
  investorsAddresses: string[];
  resolutionTypes: ResolutionTypeEntity[];
};

export type ResolutionEntity = {
  id: string;
  title: string;
  content: string;
  isNegative: boolean;
  resolutionType: ResolutionTypeEntity;
  yesVotesTotal: string;
  createTimestamp: string;
  updateTimestamp: string;
  approveTimestamp: string;
  createBy: string;
  updateBy: string;
  approveBy: string;
  voters: ResolutionVoter[];
  hasQuorum: boolean;
};

export type ResolutionAction = {
  label: string;
  disabled: boolean;
  icon: string;
};

export type ResolutionTypeInfo = {
  noticePeriodEnds: Date | null;
  noticePeriodEndsAt: string | null;
  votingEnds: Date | null;
  votingEndsAt: string | null;
};

export type ResolutionEntityEnhanced = ResolutionEntity & {
  state: ResolutionState;
  href: string;
  createdAt: string;
  updatedAt: string | null;
  approvedAt: string | null;
  action: ResolutionAction;
  resolutionTypeInfo: ResolutionTypeInfo;
  votingStatus: {
    votersHaveNotVoted: ResolutionVoter[];
    votersHaveVoted: ResolutionVoter[];
    votersHaveVotedYes: ResolutionVoter[];
    votersHaveVotedNo: ResolutionVoter[];
  };
};

export type ResolutionState = "pre-draft" | "notice" | "voting" | "ended";
export type ResolutionStateKeys = "PRE_DRAFT" | "NOTICE" | "VOTING" | "ENDED";

export type ResolutionStates = Record<ResolutionStateKeys, ResolutionState>;

export type ResolutionFormState = {
  title: string;
  content: string;
  typeId: string | null;
  isNegative: boolean | null;
};

export type OdooUser = {
  email: string;
  ethereum_address: string;
  display_name: string;
  image: string;
};

export type OdooUserTransformed = {
  email: string;
  ethereumAddress: string;
  displayName: string;
  image: string;
};

export type UsersWithEthereumAddress = Record<string, OdooUserTransformed>;

export type DelegationUser = {
  id: string;
  address: string;
  delegated: string;
};

export type DelegationStatus = {
  signerDelegatedBy: DelegationUser[];
  signerDelegationStatus: DelegationUser | null;
  usersList: Array<DelegationUser & { canBeDelegated: boolean }>;
};

export type Offer = {
  id: string;
  from: string;
  amount: BigInt;
  expirationTimestamp: string;
};

export type DaoUser = {
  id: string;
  address: string;
  totalBalance: BigInt;
  vestingBalance: BigInt;
  unlockedTempBalance: BigInt;
};

export type ComputedBalances = {
  total: number;
  vesting: number;
  unlocked: number;
  locked: number;
};
