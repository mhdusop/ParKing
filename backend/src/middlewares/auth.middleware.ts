import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { UserRole } from "@prisma/client";

interface TokenPayload {
   id: string;
   role: UserRole;
}

export const authMiddleware = (
   req: Request,
   res: Response,
   next: NextFunction
): void => {
   const { authorization } = req.headers;

   if (!authorization) {
      res.sendStatus(401);
      return;
   }

   const token = authorization.replace("Bearer ", "").trim();

   try {
      if (!config.JWT_SECRET) {
         throw new Error("SECRET_KEY is not defined in the configuration.");
      }
      const data = jwt.verify(
         token,
         config.JWT_SECRET
      ) as unknown as TokenPayload;
      req.user = {
         id: data.id,
         role: data.role,
      };
      return next();
   } catch {
      res.sendStatus(401);
      return;
   }
};
