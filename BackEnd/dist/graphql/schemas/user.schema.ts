import { gql } from "apollo-server-express";

export const userTypes = gql`
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