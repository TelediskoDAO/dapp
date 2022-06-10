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
    offers(where: { from: $userId }) {
      id
      from
      expirationTimestamp
      amount
    }
    otherOffers: offers(where: { from_not: $userId }) {
      id
      from
      expirationTimestamp
      amount
    }
  }
`;
