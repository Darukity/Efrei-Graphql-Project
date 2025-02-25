import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "./auth/auth";  // Fonction pour extraire l'utilisateur du token

const prisma = new PrismaClient();

export const context = async ({ req }: any) => {
    const token = req.headers.authorization || "";
    console.log("Authorization header:", req.headers.authorization); // Ajoute ce log pour voir l'en-tête
    const user = token ? await getUserFromToken(token) : null;
  
    return { prisma, user };
  };
  