import { gql } from "graphql-request";

export const getResolutionQuery = gql`
  query GetResolution($id: String!) {
    resolution(id: $id) {
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
