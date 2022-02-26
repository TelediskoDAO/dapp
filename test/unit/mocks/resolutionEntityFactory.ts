import type { ResolutionEntity } from "../../../src/types";

const defaultEntity = {
  id: "11",
  title: "A new hope",
  content: "Another resolution",
  isNegative: false,
  typeId: "4",
  yesVotesTotal: "0",
  approveTimestamp: "0",
  createTimestamp: "1645808255",
  updateTimestamp: "0",
};

export const createResolutionEntity = (
  overrides?: Partial<ResolutionEntity>
): ResolutionEntity => ({
  ...defaultEntity,
  ...overrides,
});
