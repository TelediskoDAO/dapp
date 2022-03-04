import { gql } from "graphql-request";

export const getResolutionQuery = gql`
  query GetResolution($id: String!) {
    resolution(id: $id) {
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
