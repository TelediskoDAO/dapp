import { gql } from "graphql-request";
import { resolutionTypeFragment } from "./resolution-type.fragment";

export const resolutionFragment = gql`
  fragment resolutionFragment on Resolution {
    id
    title
    content
    isNegative
    resolutionType {
      ...resolutionTypeFragment
    }
    yesVotesTotal
    approveTimestamp
    createTimestamp
    updateTimestamp
  }

  ${resolutionTypeFragment}
`;
