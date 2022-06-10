import { writable } from "svelte/store";

export const offerState = writable({
  loading: false,
  awaitingConfirmation: false,
});

export const resetOfferState = () => {
  offerState.set({
    loading: false,
    awaitingConfirmation: false,
  });
};
