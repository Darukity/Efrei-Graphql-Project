import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {
    getUsers: [User!]!
    me: User!
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;




