import { gql } from "graphql-request";

export const getResolutionsQuery = gql`
  query GetResolutions {
    resolutions(orderBy: createTimestamp, orderDirection: desc) {
      id
      title
      content
      isNegative
      resolutionType {
        id
        name
        quorum
        noticePeriod
        votingPeriod
        canBeNegative
      }
      yesVotesTotal
      approveTimestamp
      createTimestamp
      updateTimestamp
    }
  }
`;
