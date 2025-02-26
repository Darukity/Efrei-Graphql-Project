import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "./modules/auth.js"; // Vérifie bien le chemin !

// ✅ Création de l'instance Prisma
const db = new PrismaClient();

export type Context = {
  dataSources: {
    db: PrismaClient;
  };
  user: AuthenticatedUser | null;
};

// ✅ Export de `db` pour être utilisé dans `server.ts`
export { db };
