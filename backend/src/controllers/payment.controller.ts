import { Request, Response } from "express";
import {
   createPayment,
   getPaymentById,
   getAllPayments,
} from "../services/payment.service";
import { ApiResponse } from "../types";

export const createPaymentController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { reservationId, amount, method } = req.body;
      const processedBy = req.user?.id;

      if (!reservationId || !amount || !method) {
         res.status(400).json({
            success: false,
            error: "Reservation ID, amount, and payment method are required.",
         } as ApiResponse<null>);
         return;
      }

      const payment = await createPayment(
         reservationId,
         amount,
         method,
         processedBy
      );

      res.status(201).json({
         success: true,
         data: payment,
      } as ApiResponse<typeof payment>);
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const getPaymentByIdController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { id } = req.params;

      const payment = await getPaymentById(id);
      if (!payment) {
         res.status(404).json({
            success: false,
            error: "Payment not found.",
         } as ApiResponse<null>);
         return;
      }

      res.json({
         success: true,
         data: payment,
      } as ApiResponse<typeof payment>);
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const getAllPaymentsController = async (
   _req: Request,
   res: Response
): Promise<void> => {
   try {
      const payments = await getAllPayments();

      res.json({
         success: true,
         data: payments,
      } as ApiResponse<typeof payments>);
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};
