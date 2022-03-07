import { addSeconds, format, formatRelative, isBefore } from "date-fns";
import type {
  ResolutionEntity,
  ResolutionEntityEnhanced,
  ResolutionState,
  ResolutionStates,
  ResolutionTypeInfo,
  ResolutionsAcl,
  ResolutionVoter,
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

export const RESOLUTION_ACTIONS = {
  [RESOLUTION_STATES.PRE_DRAFT]: ($acl: ResolutionsAcl) => ({
    label: $acl.canUpdate ? "Edit or Approve" : "View",
    disabled: false,
  }),
  [RESOLUTION_STATES.NOTICE]: () => ({ label: "View", disabled: false }),
  [RESOLUTION_STATES.VOTING]: (
    $acl: ResolutionsAcl,
    resolutionVoters: ResolutionVoter[]
  ) => ({
    label: $acl.canVote(resolutionVoters) ? "View and vote" : "View",
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
  resolution: ResolutionEntity
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
    Number(resolution.resolutionType.noticePeriod)
  );

  const votingEnds = addSeconds(
    noticePeriodEnds,
    Number(resolution.resolutionType.votingPeriod)
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

export const getEnhancedResolutionMapper =
  ($currentTimestamp: number, $acl: ResolutionsAcl) =>
  (resolution: ResolutionEntity): ResolutionEntityEnhanced => {
    const resolutionTypeInfo = getResolutionTypeInfo(resolution);
    const state = getResolutionState(
      resolution,
      $currentTimestamp,
      resolutionTypeInfo
    );
    return {
      ...resolution,
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
        state === RESOLUTION_STATES.PRE_DRAFT && $acl?.canUpdate
          ? `#/resolutions/${resolution.id}/edit`
          : `#/resolutions/${resolution.id}`,
      action: RESOLUTION_ACTIONS[state]($acl, resolution.voters),
      resolutionTypeInfo,
      votingStatus: {
        votersHaveNotVoted: resolution.voters.filter((v) => !v.hasVoted),
        votersHaveVoted: resolution.voters.filter((v) => v.hasVoted),
        votersHaveVotedYes: resolution.voters.filter(
          (v) => v.hasVoted && v.hasVotedYes
        ),
        votersHaveVotedNo: resolution.voters.filter(
          (v) => v.hasVoted && !v.hasVotedYes
        ),
      },
    };
  };

export const getEnhancedResolutions = (
  resolutions: ResolutionEntity[],
  $currentTimestamp: number,
  $acl: ResolutionsAcl
): ResolutionEntityEnhanced[] => {
  const mapper = getEnhancedResolutionMapper($currentTimestamp, $acl);
  return resolutions.map(mapper);
};
