import { createUser } from "./mutations/users/createUser.js";
import { signIn } from "./mutations/users/signIn.js";
import { Resolvers } from "./types.js";
import { createArticle } from "./mutations/articles/createArticle.js";
import { getArticles } from "./mutations/articles/getArticles.js";
import { updateArticle } from "./mutations/articles/updateArticles.js";


export const resolvers: Resolvers = {
  Query: {
    ping: () => 'pong',
    getArticles,

  },
  Mutation: {
    createUser,
    signIn,
    createArticle,
    updateArticle
  },
}