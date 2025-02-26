import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "./modules/auth";

export type Context = {
  dataSources: {
    db: PrismaClient,
  };
  user: AuthenticatedUser | null
};