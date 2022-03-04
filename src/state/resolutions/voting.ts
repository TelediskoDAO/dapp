import { writable } from "svelte/store";

export const votingState = writable({
  loading: false,
  awaitingConfirmation: false,
});

export const resetVotingState = () => {
  votingState.set({
    loading: false,
    awaitingConfirmation: false,
  });
};
