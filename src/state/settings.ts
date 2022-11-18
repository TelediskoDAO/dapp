import { appEnv } from "../stores/config";
import { persistable } from "./utils";

export const showWIPFeatures = persistable<boolean>(
  "settings.showWIPFeatures",
  appEnv !== 'production'
);
