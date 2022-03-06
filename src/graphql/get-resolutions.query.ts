import { gql } from "graphql-request";
import { resolutionManagerFragment } from "./resolution-manager.fragment";
import { resolutionFragment } from "./resolution.fragment";

export const getResolutionsQuery = gql`
  query GetResolutions {
    resolutions(orderBy: createTimestamp, orderDirection: desc) {
      ...resolutionFragment
    }

    resolutionManager(id: "0") {
      ...resolutionManagerFragment
    }
  }

  ${resolutionFragment}
  ${resolutionManagerFragment}
`;
