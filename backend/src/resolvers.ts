import { createUser } from "./mutations/users/createUser.js";
import { signIn } from "./mutations/users/signIn.js";
import { Resolvers } from "./types.js";



export const resolvers: Resolvers = {
  Query: {
    ping: () => 'pong',
  },
  Mutation: {
    createUser,
    signIn,
  },
}