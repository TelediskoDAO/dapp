import { writable } from 'svelte/store';

const RESOLUTIONS_LS_KEY = 'resolutions'
const resolutionsFromLs = localStorage.getItem(RESOLUTIONS_LS_KEY)

export const resolutions = writable(resolutionsFromLs ? JSON.parse(resolutionsFromLs) : []);

resolutions.subscribe((newResolutions) => {
  localStorage.setItem(RESOLUTIONS_LS_KEY, JSON.stringify(newResolutions))
})