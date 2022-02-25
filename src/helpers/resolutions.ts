import { addSeconds, formatRelative, isBefore } from "date-fns";
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

export const getDateFromUnixTimestamp = (unixTs: string) =>
  new Date(Number(unixTs) * 1000);

export const getRelativeDateFromUnixTimestamp = (
  unixTs: string,
  baseDate: Date = new Date()
) => formatRelative(getDateFromUnixTimestamp(unixTs), baseDate);

export const getResolutionState = (
  resolution: ResolutionEntity,
  $currentTimestamp: number,
  resolutionType: ResolutionManager.ResolutionTypeStructOutput
): ResolutionState => {
  if (resolution.approveTimestamp !== "0") {
    const noticePeriodEnds = addSeconds(
      getDateFromUnixTimestamp(resolution.approveTimestamp),
      Number(resolutionType.noticePeriod)
    );
    if (isBefore(new Date($currentTimestamp), noticePeriodEnds)) {
      return RESOLUTION_STATES.NOTICE;
    }
    const votingEnds = addSeconds(
      noticePeriodEnds,
      Number(resolutionType.votingPeriod)
    );
    if (isBefore(new Date($currentTimestamp), votingEnds)) {
      return RESOLUTION_STATES.VOTING;
    }
    return RESOLUTION_STATES.ENDED;
  }
  return RESOLUTION_STATES.PRE_DRAFT;
};

export const getEnhancedResolutions = (
  resolutions: ResolutionEntity[],
  $resolutionContractTypes: ResolutionManager.ResolutionTypeStructOutput[],
  $currentTimestamp: number
): ResolutionEntityEnhanced[] =>
  resolutions.map((resolution: ResolutionEntity): ResolutionEntityEnhanced => {
    const state = getResolutionState(
      resolution,
      $currentTimestamp,
      $resolutionContractTypes[Number(resolution.typeId)]
    );
    return {
      ...resolution,
      typeName: $resolutionContractTypes[Number(resolution.typeId)].name,
      state,
      createdAt: getRelativeDateFromUnixTimestamp(resolution.createTimestamp),
      updatedAt:
        resolution.updateTimestamp !== "0"
          ? getRelativeDateFromUnixTimestamp(resolution.updateTimestamp)
          : null,
      approvedAt: new Date($currentTimestamp) + "",
      href:
        state === RESOLUTION_STATES.PRE_DRAFT
          ? `#/resolutions/${resolution.id}/edit`
          : `#/resolutions/${resolution.id}`,
    };
  });
