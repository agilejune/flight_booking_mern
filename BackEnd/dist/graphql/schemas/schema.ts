import { gql } from "apollo-server-express";

const types = gql`
  type Query {
    success: String!
  }

  type Mutation {
    success: String!
  }
`;

export default types;
