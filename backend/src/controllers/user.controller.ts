// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { createUser, findUserById } from "../services/user.service";
import { ApiResponse, User } from "../types";

export const createUserController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { email, name, phone, role } = req.body;
      const user = await createUser({ email, name, phone, role });

      res.status(201).json({
         success: true,
         data: user,
      } as ApiResponse<User>);
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : "An error occurred",
      } as ApiResponse<null>);
   }
};

export const getUserController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const userId = req.params.id;
      const user = await findUserById(userId);

      if (!user) {
         res.status(404).json({
            success: false,
            error: "User not found",
         } as ApiResponse<null>);
         return;
      }

      res.json({
         success: true,
         data: user,
      } as ApiResponse<User>);
   } catch (error) {
      res.status(500).json({
         success: false,
         error: "Internal server error",
      } as ApiResponse<null>);
   }
};
