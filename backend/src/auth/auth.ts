// src/auth/auth.ts
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateToken = (user: { id: number; email: string }) => {  // Changer le type de `id` en `number`
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });
};

export const getUserFromToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: number };  // Mettre `id` en `number`
    return await prisma.user.findUnique({ where: { id: decoded.id } });
  } catch (err) {
    throw new Error("Not authenticated");
  }
};

