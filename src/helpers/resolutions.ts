import type { ResolutionManager } from "../../contracts/typechain/ResolutionManager";
import type {
  ResolutionEntity,
  ResolutionEntityEnhanced,
  ResolutionState,
  ResolutionStates,
} from "../types";

export const RESOLUTION_STATES: ResolutionStates = {
  PRE_DRAFT: "pre-draft", // default state
  // transition to when approved
  NOTICE: "notice",
  // transition to when notice period ends
  VOTING: "voting",
  // transition to when voting period ends
  ENDED: "ended",
};

export const getResolutionState = (
  resolution: ResolutionEntity
): ResolutionState => {
  if (resolution.approveTimestamp !== "0") {
    // TODO
    // we should check the resolution type and
    // derive the state based on the approveTimestamp + notice/voting period
    return RESOLUTION_STATES.NOTICE;
  }
  return RESOLUTION_STATES.PRE_DRAFT;
};

export const getEnhancedResolutions = (
  resolutions: ResolutionEntity[],
  $resolutionContractTypes: ResolutionManager.ResolutionTypeStructOutput[]
): ResolutionEntityEnhanced[] =>
  resolutions.map((resolution: ResolutionEntity): ResolutionEntityEnhanced => {
    const state = getResolutionState(resolution);
    return {
      ...resolution,
      typeName: $resolutionContractTypes[Number(resolution.typeId)].name,
      state: getResolutionState(resolution),
      href:
        state === RESOLUTION_STATES.PRE_DRAFT
          ? `#/resolutions/${resolution.id}/edit`
          : `#/resolutions/${resolution.id}`,
    };
  });
