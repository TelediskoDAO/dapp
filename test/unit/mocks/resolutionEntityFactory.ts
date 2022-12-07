import type {
  ResolutionEntity,
  ResolutionEntityEnhanced,
  ResolutionTypeEntity,
} from "../../../src/types";
import { mdiBookEditOutline } from "@mdi/js";

import resolutionTypes from "./resolutionTypes.json";

const defaultResolutionType: (id: string) => ResolutionTypeEntity = (
  id: string
) => resolutionTypes.find((res) => res.id === id) as ResolutionTypeEntity;

const defaultEntity: ResolutionEntity = {
  id: "42",
  title: "A new hope",
  content: "Another resolution",
  isNegative: false,
  resolutionType: defaultResolutionType("4"),
  yesVotesTotal: "0",
  approveTimestamp: "0",
  rejectTimestamp: "0",
  createTimestamp: "1645808255",
  updateTimestamp: "0",
  voters: [],
  createBy: "42",
  updateBy: "42",
  approveBy: "42",
  rejectBy: "42",
  hasQuorum: false,
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
  rejectedAt: null,
  executedAt: null,
  rejectTimestamp: "0",
  rejectBy: "42",
  href: "#/resolutions/42/edit",
  action: {
    label: "Edit or Approve",
    disabled: false,
    icon: mdiBookEditOutline,
  },
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
  hasQuorum: false,
  votingStatus: {
    votersHaveNotVoted: [],
    votersHaveVoted: [],
    votersHaveVotedYes: [],
    votersHaveVotedNo: [],
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
