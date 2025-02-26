import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    ping: String!
  }
  type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
    signIn(username: String!, password: String!): SignInResponse!
  }

  type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }
    
  type SignInResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
  }

  type User {
    id: ID!
    username: String!
  }
`;