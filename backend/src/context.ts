import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

console.log("📌 Modèles disponibles dans Prisma après RESET:", Object.keys(db)); // 🔍 Vérifie si `article` est bien là

export { db };

