import { Router } from "express";
import {
   getMyReservationsController,
   createReservationController,
   cancelReservationController,
   confirmReservationPaymentController,
   getPendingCashPaymentsController,
   getAllReservationsController,
   completeExpiredReservationsController,
} from "../controllers/reservation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const reservationRouter = Router();

reservationRouter.get("/", getAllReservationsController);

reservationRouter.get(
   "/my-reservations",
   authMiddleware,
   getMyReservationsController
);
reservationRouter.post("/", authMiddleware, createReservationController);
reservationRouter.delete("/:id", authMiddleware, cancelReservationController);
reservationRouter.put(
   "/:id/confirm",
   authMiddleware,
   confirmReservationPaymentController
);
reservationRouter.post(
   "/complete-expired",
   authMiddleware,
   completeExpiredReservationsController
);
reservationRouter.get(
   "/pending-cash",
   authMiddleware,
   getPendingCashPaymentsController
);

export default reservationRouter;
