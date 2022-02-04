import { writable } from 'svelte/store';

// temporarily
export const RESOLUTION_TYPES = {
  0: 'fundamental',
  1: 'significant',
  2: 'other'
}

export const RESOLUTION_STATES = {
  PRE_DRAFT: 'pre-draft', // default state
  // transition to when approved
  NOTICE: 'notice', 
  // transition to when notice period ends
  VOTING: 'voting',
  // transition to when voting period ends
  ENDED: 'ended',
}

export const emptyResolution = {
  // editable from the UI
  title: '',
  content: '',
  type: null,

  // non-editable from the UI
  status: RESOLUTION_STATES.PRE_DRAFT,
  ipfsId: null,
  blockHash: null,
}

export const currentResolution = writable({ ...emptyResolution });