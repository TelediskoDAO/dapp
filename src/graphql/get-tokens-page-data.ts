import { gql } from "graphql-request";

export const getTokensPageData = gql`
  query GetTokensPageData($userId: String!) {
    daoUser(id: $userId) {
      id
      address
      totalBalance
      vestingBalance
      unlockedTempBalance
    }
    offers(orderBy: createTimestamp) {
      id
      from
      expirationTimestamp
      amount
    }
  }
`;
