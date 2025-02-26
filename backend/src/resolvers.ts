import { createUser } from "./mutations/users/createUser.js";
import { signIn } from "./mutations/users/signIn.js";
import { Resolvers } from "./types.js";
import { createArticle } from "./mutations/articles/createArticle.js";



export const resolvers: Resolvers = {
  Query: {
    ping: () => 'pong',
  },
  Mutation: {
    createUser,
    signIn,
    createArticle
  },
}