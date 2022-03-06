import { gql } from "graphql-request";
import { resolutionManagerFragment } from "./resolution-manager.fragment";

export const getResolutionManagerQuery = gql`
  query GetResolutionManager {
    resolutionManager(id: "0") {
      ...resolutionManagerFragment
    }
  }

  ${resolutionManagerFragment}
`;
