import { writable } from "svelte/store";

export type ResolutionState = "pre-draft" | "notice" | "voting" | "ended";
export type ResolutionStateKeys = "PRE_DRAFT" | "NOTICE" | "VOTING" | "ENDED";
export type ResolutionType =
  | "amendment"
  | "capitalChange"
  | "preclusion"
  | "fundamentalOther"
  | "significant"
  | "dissolution"
  | "routine";
export type ResolutionTypeKeys = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type ResolutionStates = Record<ResolutionStateKeys, ResolutionState>;
type ResolutionTypes = Record<ResolutionTypeKeys, ResolutionType>;

export interface Resolution {
  title: string;
  content: string;
  type: number | null;
  isNegative: boolean | null;
}

// temporarily
export const RESOLUTION_TYPES: ResolutionTypes = {
  0: "amendment",
  1: "capitalChange",
  2: "preclusion",
  3: "fundamentalOther",
  4: "significant",
  5: "dissolution",
  6: "routine",
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

export const emptyResolution: Resolution = {
  // editable from the UI
  title: "",
  content: "",
  type: null,
  isNegative: false,
};

export const currentResolution = writable({ ...emptyResolution });
