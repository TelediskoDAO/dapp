import { GraphQLClient } from "graphql-request";
import { graphProtocolGqlEndpoint } from "../stores/config";

export const graphQLClient = new GraphQLClient(
  graphProtocolGqlEndpoint,
  { headers: {} }
);
