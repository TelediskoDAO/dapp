import { writable } from "svelte/store";

export const currentTimestamp = writable(+new Date());
