import { Router } from "express";
import {
   createUserController,
   getUserController,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/", createUserController);
userRouter.get("/:id", getUserController);

export default userRouter;
