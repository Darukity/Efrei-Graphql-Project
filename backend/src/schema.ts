import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    ping: String!
    getArticles: [Article] 
    getArticleById(id: ID!): Article
    getUserArticles: GetUserArticlesResponse!
  }

  type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
    signIn(username: String!, password: String!): SignInResponse!
    createArticle(title: String!, content: String!): CreateArticleResponse
    updateArticle(id: String!, title: String, content: String): UpdateArticleResponse
    deleteArticle(id: ID!): DeleteArticleResponse
    addLike(articleId: ID!): AddLikeResponse
    addComment(articleId: ID!, content: String!): AddCommentResponse
   
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
  
  type UpdateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }
    
  type DeleteArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

 type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment]! 
    likesCount: Int! 
    createdAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    user: User!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
  }

  type AddLikeResponse {
    code: Int!
    success: Boolean!
    message: String!
    likesCount: Int! # ✅ Retourne le nouveau nombre de likes après l'ajout
  }

  type Like {
    id: ID!
    user: User!
    article: Article!
  }

   type AddCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }
  type GetUserArticlesResponse {
    code: Int!
    success: Boolean!
    message: String!
    articles: [Article]! # ✅ Retourne la liste des articles
}

`;