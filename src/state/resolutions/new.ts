import { writable } from 'svelte/store';

// temporarily
export const RESOLUTION_TYPES = {
  0: 'fundamental',
  1: 'significant',
  2: 'other'
}

export const newResolution = writable({
  title: '',
  content: '',
  type: null
});