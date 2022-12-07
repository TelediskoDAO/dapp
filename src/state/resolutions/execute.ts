import { writable } from "svelte/store";

export const executeState = writable({
  loading: false,
  awaitingConfirmation: false,
});

export const resetExecuteState = () => {
  executeState.set({
    loading: false,
    awaitingConfirmation: false,
  });
};
