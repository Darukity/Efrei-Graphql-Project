import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signin = async (parent: any, { email, password }: { email: string; password: string }) => {
    console.log("Received email:", email); 
    console.log("Received password:", password); 
    
    if (!email) {
      throw new Error("Email is required");
    }
  
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
  
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
  
    return { token };
  };
  