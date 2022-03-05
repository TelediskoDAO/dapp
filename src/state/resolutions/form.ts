import { writable } from "svelte/store";

import type { ResolutionFormState } from "../../types";

export const defaultFormState: ResolutionFormState = {
  title: "",
  content: "",
  typeId: null,
  isNegative: false,
};

export const currentResolution = writable({ ...defaultFormState });

export const resetForm = () => {
  currentResolution.set({ ...defaultFormState });
};

export const formState = writable({
  loading: false,
  awaitingConfirmation: false,
});

export const resetFormState = () => {
  formState.set({
    loading: false,
    awaitingConfirmation: false,
  });
};
