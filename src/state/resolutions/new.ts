import { writable } from 'svelte/store';

// temporarily
export const RESOLUTION_TYPES = {
  0: 'fundamental',
  1: 'significant',
  2: 'other'
}

export const RESOLUTION_STATES = {
  PRE_DRAFT: 'pre-draft',
  APPROVED: 'approved'
}

export const newResolution = writable({
  title: '',
  content: '',
  type: null,
  status: RESOLUTION_STATES.PRE_DRAFT,
  ipfsId: null
});