import { gql } from "graphql-request";

export const resolutionManagerFragment = gql`
  fragment resolutionManagerFragment on ResolutionManager {
    id
    foundersAddresses
    contributorsAddresses
    investorsAddresses
    shareholdersAddresses
  }
`;
