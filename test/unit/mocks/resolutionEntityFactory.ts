import type {
  ResolutionEntity,
  ResolutionEntityEnhanced,
  ResolutionTypeEntity,
} from "../../../src/types";

import resolutionTypes from "./resolutionTypes.json";

const defaultResolutionType: (id: string) => ResolutionTypeEntity = (
  id: string
) => resolutionTypes.find((res) => res.id === id);

const defaultEntity: ResolutionEntity = {
  id: "42",
  title: "A new hope",
  content: "Another resolution",
  isNegative: false,
  resolutionType: defaultResolutionType("4"),
  yesVotesTotal: "0",
  approveTimestamp: "0",
  createTimestamp: "1645808255",
  updateTimestamp: "0",
  voters: [],
  createBy: "42",
  updateBy: "42",
  approveBy: "42",
};

const enhancedEntity: ResolutionEntityEnhanced = {
  id: "42",
  title: "A new hope",
  content: "Another resolution",
  isNegative: false,
  resolutionType: defaultResolutionType("4"),
  yesVotesTotal: "0",
  approveTimestamp: "0",
  createTimestamp: "1645808255",
  updateTimestamp: "0",
  state: "pre-draft",
  createdAt: "02/25/2022",
  updatedAt: null,
  approvedAt: null,
  href: "#/resolutions/42/edit",
  action: { label: "Edit or Approve", disabled: false },
  resolutionTypeInfo: {
    noticePeriodEnds: null,
    noticePeriodEndsAt: null,
    votingEnds: null,
    votingEndsAt: null,
  },
  voters: [],
  createBy: "42",
  updateBy: "42",
  approveBy: "42",
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
