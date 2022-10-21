import { writable } from "svelte/store";

export const transferState = writable({
  loading: false,
  awaitingConfirmation: false,
});

export const resetTransferState = () => {
  transferState.set({
    loading: false,
    awaitingConfirmation: false,
  });
};
