import type { ResolutionsAcl } from "../../../src/types";

export const createResolutionsAcl = (
  overrides: Partial<ResolutionsAcl> = {}
): ResolutionsAcl => ({
  canCreate: true,
  canUpdate: true,
  canApprove: true,
  canVote: () => true,
  loaded: true,
  isContributor: true,
  isShareholder: false,
  isManagingBoard: true,
  ...overrides,
});
