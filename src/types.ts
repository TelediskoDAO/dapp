export type ResolutionEntity = {
  id: string;
  title: string;
  content: string;
  isNegative: boolean;
  typeId: string;
  yesVotesTotal: string;
  approveTimestamp: string;
  createTimestamp: string;
  updateTimestamp: string;
};

export type ResolutionEntityEnhanced = ResolutionEntity & {
  state: ResolutionState;
  typeName: string;
  href: string;
  createdAt: string;
  updatedAt: string | null;
  approvedAt: string | null;
};

export type ResolutionState = "pre-draft" | "notice" | "voting" | "ended";
export type ResolutionStateKeys = "PRE_DRAFT" | "NOTICE" | "VOTING" | "ENDED";

export type ResolutionStates = Record<ResolutionStateKeys, ResolutionState>;

export type ResolutionFormState = {
  title: string;
  content: string;
  type: number | null;
  isNegative: boolean | null;
};
