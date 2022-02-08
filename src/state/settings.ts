import CONFIG from "../config";
import { persistable } from "./utils";

export const showWIPFeatures = persistable<boolean>(
  "settings.showWIPFeatures",
  !CONFIG.production
);
