import { gql } from "graphql-request";
import { resolutionManagerFragment } from "./resolution-manager.fragment";
import { resolutionFragment } from "./resolution.fragment";

export const getResolutionQuery = gql`
  query GetResolution($id: String!) {
    resolution(id: $id) {
      ...resolutionFragment
    }

    resolutionManager(id: "0") {
      ...resolutionManagerFragment
    }
  }

  ${resolutionFragment}
  ${resolutionManagerFragment}
`;
