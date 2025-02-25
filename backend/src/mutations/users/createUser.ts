// src/mutations/users/createUser.ts
import { signup } from "../../auth/signup";

export const createUser = async (_parent: any, { email, password }: { email: string; password: string }) => {
  return await signup(email, password);
};
