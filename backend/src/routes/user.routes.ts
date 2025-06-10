import { Router } from "express";
import {
   createUserController,
   getUserController,
} from "../controllers/user.controller";

export function userRoutes() {
   const router = Router();

   router.post("/", createUserController);
   router.get("/:id", getUserController);

   return router;
}
