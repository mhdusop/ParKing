import { Router } from "express";
import {
   createPaymentController,
   getPaymentByIdController,
   getAllPaymentsController,
} from "../controllers/payment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const paymentRouter = Router();

paymentRouter.post("/", authMiddleware, createPaymentController);
paymentRouter.get("/:id", authMiddleware, getPaymentByIdController);
paymentRouter.get("/", authMiddleware, getAllPaymentsController);

export default paymentRouter;
