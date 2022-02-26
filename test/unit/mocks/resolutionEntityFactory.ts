import type { ResolutionEntity } from "../../../src/types";
import type { ResolutionEntityEnhanced } from "../../../src/types";

const defaultEntity = {
  id: "42",
  title: "A new hope",
  content: "Another resolution",
  isNegative: false,
  typeId: "4",
  yesVotesTotal: "0",
  approveTimestamp: "0",
  createTimestamp: "1645808255",
  updateTimestamp: "0",
};

const enhancedEntity = {
  id: "42",
  title: "A new hope",
  content: "Another resolution",
  isNegative: false,
  typeId: "4",
  yesVotesTotal: "0",
  approveTimestamp: "0",
  createTimestamp: "1645808255",
  updateTimestamp: "0",
  typeName: "significant",
  state: "pre-draft",
  createdAt: "last Friday at 5:57 PM",
  updatedAt: null,
  approvedAt: null,
  href: "#/resolutions/42/edit",
  action: { label: "Edit", disabled: false },
  resolutionTypeInfo: {
    noticePeriodEnds: null,
    noticePeriodEndsAt: null,
    votingEnds: null,
    votingEndsAt: null,
  },
};

export const createResolutionEntity = (
  overrides?: Partial<ResolutionEntity>
): ResolutionEntity => ({
  ...defaultEntity,
  ...overrides,
});

export const createEnhancedResolutionEntity = (
  overrides?: Partial<ResolutionEntityEnhanced>
): ResolutionEntity => ({
  ...enhancedEntity,
  ...overrides,
});
