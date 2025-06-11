import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { createUser, findUserByEmail } from "../services/user.service";
import { ApiResponse, User } from "../types";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

export const registerController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { email, password, name, phone } = req.body;

      const user = await createUser({
         email,
         password,
         name,
         phone,
         role: UserRole.USER,
      });

      res.status(201).json({
         success: true,
         data: user,
      } as ApiResponse<User>);
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const loginController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { email, password } = req.body;

      const user = await findUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
         res.status(401).json({
            success: false,
            error: "Invalid email or password",
         } as ApiResponse<null>);
         return;
      }

      const token = jwt.sign(
         { id: user.id, role: user.role },
         config.JWT_SECRET || "default_secret",
         { expiresIn: "1h" }
      );

      res.json({
         success: true,
         data: { token, user },
      } as ApiResponse<{ token: string }>);
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};
