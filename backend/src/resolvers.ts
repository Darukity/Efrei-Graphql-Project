import { PrismaClient } from "@prisma/client";  // Ajout de l'import de PrismaClient
import { createUser } from "./mutations/users/createUser";  // Pour la création d'utilisateur
import { signin } from "./auth/signin";  // Import de la fonction signin

const prisma = new PrismaClient();  // Crée une instance de PrismaClient

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await prisma.user.findMany();  // Utilisation de l'instance Prisma
    },
    me: async (_parent: any, _args: any, context: any) => {
      return context.user;  // Retourne l'utilisateur connecté à partir du contexte
    },
  },

  Mutation: {
    signup: createUser,  // Mutation pour la création de l'utilisateur
    login: signin,  // Mutation pour la connexion de l'utilisateur
  },
};




