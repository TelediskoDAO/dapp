import { gql } from "graphql-request";

export const getResolutionsQuery = gql`
  query GetResolutions {
    resolutionMockTests {
      id
      ipfsDataURI
    }
  }
`;
