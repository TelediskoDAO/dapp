import { writable } from "svelte/store";

export type ResolutionState = "pre-draft" | "notice" | "voting" | "ended";
export type ResolutionStateKeys = "PRE_DRAFT" | "NOTICE" | "VOTING" | "ENDED";

type ResolutionStates = Record<ResolutionStateKeys, ResolutionState>;

export interface Resolution {
  title: string;
  content: string;
  type: number | null;
  isNegative: boolean | null;
}

export const RESOLUTION_STATES: ResolutionStates = {
  PRE_DRAFT: "pre-draft", // default state
  // transition to when approved
  NOTICE: "notice",
  // transition to when notice period ends
  VOTING: "voting",
  // transition to when voting period ends
  ENDED: "ended",
};

export const emptyResolution: Resolution = {
  // editable from the UI
  title: "",
  content: "",
  type: null,
  isNegative: false,
};

export const getResolutionState = (resolution): ResolutionState => {
  if (resolution.approveTimestamp !== "0") {
    // TODO
    // we should check the resolution type and
    // derive the state based on the approveTimestamp + notice/voting period
    return RESOLUTION_STATES.NOTICE;
  }
  return RESOLUTION_STATES.PRE_DRAFT;
};

export const currentResolution = writable({ ...emptyResolution });
