// src/services/user.service.ts
import prisma from "../utils/prisma";
import { User } from "../types";

export const createUser = async (
   data: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> => {
   try {
      return await prisma.user.create({
         data: {
            email: data.email,
            name: data.name,
            phone: data.phone,
            role: data.role,
         },
      });
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error creating user: ${error.message}`);
      }
      throw new Error("Error creating user: Unknown error");
   }
};

export const findUserById = async (id: string): Promise<User | null> => {
   try {
      return await prisma.user.findUnique({ where: { id } });
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error finding user by ID: ${error.message}`);
      }
      throw new Error("Error finding user by ID: Unknown error");
   }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
   try {
      return await prisma.user.findUnique({ where: { email } });
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error finding user by email: ${error.message}`);
      }
      throw new Error("Error finding user by email: Unknown error");
   }
};
