import type { BigNumber } from 'ethers';
import { writable } from 'svelte/store';

export type ResolutionState = 'pre-draft' | 'notice' | 'voting' | 'ended';
export type ResolutionStateKeys = 'PRE_DRAFT' | 'NOTICE' | 'VOTING' | 'ENDED';
export type ResolutionType = 'fundamental' | 'significant' | 'other';
export type ResolutionTypeKeys = 0 | 1 | 2;

type ResolutionStates = Record<ResolutionStateKeys, ResolutionState>
type ResolutionTypes = Record<ResolutionTypeKeys, ResolutionType>

export interface Resolution {
  title: string
  content: string
  type: number | null
  state: ResolutionState
  ipfsId: string | null
  blockHash: string | null
  resolutionId: number | null
}

// temporarily
export const RESOLUTION_TYPES: ResolutionTypes = {
  0: 'fundamental',
  1: 'significant',
  2: 'other',
}

export const RESOLUTION_STATES: ResolutionStates = {
  PRE_DRAFT: 'pre-draft', // default state
  // transition to when approved
  NOTICE: 'notice', 
  // transition to when notice period ends
  VOTING: 'voting',
  // transition to when voting period ends
  ENDED: 'ended',
}

export const emptyResolution: Resolution = {
  // editable from the UI
  title: '',
  content: '',
  type: null,

  // non-editable from the UI
  state: RESOLUTION_STATES.PRE_DRAFT,
  ipfsId: null,
  blockHash: null,
  resolutionId: null,
}

export const currentResolution = writable({ ...emptyResolution });