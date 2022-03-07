import type { ResolutionsAcl } from "../../../src/types";

export const createResolutionsAcl = (
  overrides: Partial<ResolutionsAcl> = {}
): ResolutionsAcl => ({
  canCreate: true,
  canUpdate: true,
  canApprove: true,
  canVote: () => true,
  loaded: true,
  ...overrides,
});
