import { gql } from "graphql-request";

export const getResolutionQuery = gql`
  query GetResolution($id: String!) {
    resolutionMockTest(id: $id) {
      ipfsDataURI
      approved
    }
  }
`;
