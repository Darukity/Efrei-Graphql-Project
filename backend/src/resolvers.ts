import { createUser } from "./mutations/users/createUser.js";
import { Resolvers, Speciality } from "./types.js";



export const resolvers: Resolvers = {
  Mutation: {
    createUser,
  },
}