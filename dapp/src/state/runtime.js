import { writable } from "svelte/store";

export const errors = writable([]);
export const platform = writable({});
export const title = writable("Teledisko DAO");
export const updateAvailable = writable();
