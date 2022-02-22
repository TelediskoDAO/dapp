import { gql } from "graphql-request";

export const getResolutionsQuery = gql`
  query GetResolutions {
    resolutions {
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
  }
`;
