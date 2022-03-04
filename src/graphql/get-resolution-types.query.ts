import { gql } from "graphql-request";

export const getResolutionTypesQuery = gql`
  query GetResolutionTypes {
    resolutionTypes {
      id
      name
      quorum
      noticePeriod
      votingPeriod
      canBeNegative
    }
  }
`;
