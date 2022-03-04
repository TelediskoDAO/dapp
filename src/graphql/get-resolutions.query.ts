import { gql } from "graphql-request";

export const getResolutionsQuery = gql`
  query GetResolutions {
    resolutions(orderBy: createTimestamp, orderDirection: desc) {
      id
      title
      content
      isNegative
      typeId
      yesVotesTotal
      approveTimestamp
      createTimestamp
      updateTimestamp
    }

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
