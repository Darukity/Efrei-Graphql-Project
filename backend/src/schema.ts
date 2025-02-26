import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    ping: String!
    getArticles: [Article] 

  }
  type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
    signIn(username: String!, password: String!): SignInResponse!
    createArticle(title: String!, content: String!): CreateArticleResponse
    updateArticle(id: String!, title: String, content: String): Article
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
     type CreateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
  }
`;