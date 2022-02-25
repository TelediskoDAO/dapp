import { addSeconds, format, formatRelative, isBefore } from "date-fns";
import type { ResolutionManager } from "../../contracts/typechain/ResolutionManager";
import { ResolutionTypeInfo } from "../types";
import type {
  ResolutionEntity,
  ResolutionEntityEnhanced,
  ResolutionState,
  ResolutionStates,
} from "../types";

export const VOTING = {
  YES: "yes",
  NO: "no",
};

export const RESOLUTION_STATES: ResolutionStates = {
  PRE_DRAFT: "pre-draft", // default state
  // transition to when approved
  NOTICE: "notice",
  // transition to when notice period ends
  VOTING: "voting",
  // transition to when voting period ends
  ENDED: "ended",
};

// TODO, once we will have the ACL, we will do the logic here in the function to disable or not the action button
export const RESOLUTION_ACTIONS = {
  [RESOLUTION_STATES.PRE_DRAFT]: () => ({ label: "Edit", disabled: false }),
  [RESOLUTION_STATES.NOTICE]: () => ({ label: "View", disabled: false }),
  [RESOLUTION_STATES.VOTING]: () => ({
    label: "View and vote",
    disabled: false,
  }),
  [RESOLUTION_STATES.ENDED]: () => ({ label: "View", disabled: false }),
};

export const getDateFromUnixTimestamp = (unixTs: string) =>
  new Date(Number(unixTs) * 1000);

export const getRelativeDateFromUnixTimestamp = (
  unixTs: string,
  baseDate: Date = new Date()
) => formatRelative(getDateFromUnixTimestamp(unixTs), baseDate);

export const getResolutionTypeInfo = (
  resolution: ResolutionEntity,
  resolutionType: ResolutionManager.ResolutionTypeStructOutput
): ResolutionTypeInfo => {
  if (resolution.approveTimestamp === "0") {
    return {
      noticePeriodEnds: null,
      noticePeriodEndsAt: null,
      votingEnds: null,
      votingEndsAt: null,
    };
  }

  const noticePeriodEnds = addSeconds(
    getDateFromUnixTimestamp(resolution.approveTimestamp),
    Number(resolutionType.noticePeriod)
  );

  const votingEnds = addSeconds(
    noticePeriodEnds,
    Number(resolutionType.votingPeriod)
  );

  return {
    noticePeriodEnds,
    noticePeriodEndsAt: format(noticePeriodEnds, "dd LLL yyyy, H:mm:ss"),
    votingEnds,
    votingEndsAt: format(votingEnds, "dd LLL yyyy, H:mm:ss"),
  };
};

export const getResolutionState = (
  resolution: ResolutionEntity,
  $currentTimestamp: number,
  resolutionTypeInfo: ResolutionTypeInfo
): ResolutionState => {
  if (resolution.approveTimestamp !== "0") {
    const { noticePeriodEnds, votingEnds } = resolutionTypeInfo;
    if (isBefore(new Date($currentTimestamp), noticePeriodEnds)) {
      return RESOLUTION_STATES.NOTICE;
    }
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
    const resolutionTypeInfo = getResolutionTypeInfo(
      resolution,
      $resolutionContractTypes[Number(resolution.typeId)]
    );
    const state = getResolutionState(
      resolution,
      $currentTimestamp,
      resolutionTypeInfo
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
      approvedAt:
        resolution.approveTimestamp !== "0"
          ? getRelativeDateFromUnixTimestamp(resolution.approveTimestamp)
          : null,
      href:
        state === RESOLUTION_STATES.PRE_DRAFT
          ? `#/resolutions/${resolution.id}/edit`
          : `#/resolutions/${resolution.id}`,
      action: RESOLUTION_ACTIONS[state](),
      resolutionTypeInfo,
    };
  });
