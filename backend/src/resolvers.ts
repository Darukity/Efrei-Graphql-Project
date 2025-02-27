import { createUser } from "./mutations/users/createUser.js";
import { signIn } from "./mutations/users/signIn.js";
import { Resolvers } from "./types.js";
import { createArticle } from "./mutations/articles/createArticle.js";
import { getArticles } from "./mutations/articles/getArticles.js";
import { updateArticle } from "./mutations/articles/updateArticles.js";
import { deleteArticle } from "./mutations/articles/deleteArticle.js";
import { getArticleById } from "./mutations/articles/getArticleById.js";
import { addLike } from "./mutations/articles/addLike.js";
import { addComment } from "./mutations/articles/addComment.js";


export const resolvers: Resolvers = {
  Query: {
    ping: () => 'pong',
    getArticles,
    getArticleById
    

  },
  Mutation: {
    createUser,
    signIn,
    createArticle,
    updateArticle,
    deleteArticle,
    addLike,
    addComment
  },
}