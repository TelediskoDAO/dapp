import { writable } from "svelte/store";
import type {
  ResolutionEntity,
  ResolutionFormState,
  ResolutionState,
  ResolutionStates,
} from "../../types";

export const RESOLUTION_STATES: ResolutionStates = {
  PRE_DRAFT: "pre-draft", // default state
  // transition to when approved
  NOTICE: "notice",
  // transition to when notice period ends
  VOTING: "voting",
  // transition to when voting period ends
  ENDED: "ended",
};

export const emptyResolution: ResolutionFormState = {
  // editable from the UI
  title: "",
  content: "",
  type: null,
  isNegative: false,
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

export const currentResolution = writable({ ...emptyResolution });
