"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userTypes = (0, apollo_server_express_1.gql) `
  scalar Date

  type Query {
    success: String!
  }

  type Mutation {
    success: String!
  }

  input LoginInput {
    email: String!
    password: String!
    role: String!
  }

  type User {
    id: Int
    first_name: String
    last_name: String
    email: String
    phone_number: String
    birthday: Date
  }

  type LoginResponseData {
    token: String
    user: User
  }

  type LoginResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: LoginResponseData
  }

  type Query {
    login(input: LoginInput): LoginResponse
  }

  input AddUserInput {
    first_name: String
    last_name: String
    email: String
    password: String
    phone_number: String
    birthday: Date
    role: String
  }

  type AddUserResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
  }

  type Mutation {
    addUser(input: AddUserInput): AddUserResponse
  }
`;
