"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const types = (0, apollo_server_express_1.gql) `
  type Query {
    success: String!
  }

  type Mutation {
    success: String!
  }
`;
exports.default = types;
