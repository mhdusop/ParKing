import { Request, Response } from "express";
import {
   getAllReservations,
   createReservation,
   cancelReservation,
   confirmReservationPayment,
   getPendingCashPayments,
} from "../services/reservation.service";
import { ApiResponse, Reservation, CreateReservationInput } from "../types";

export const getMyReservationsController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const userId = req.user?.id;

      if (!userId) {
         res.status(400).json({
            success: false,
            error: "User ID is required",
         } as ApiResponse<null>);
         return;
      }
      const reservations = await getAllReservations(userId);

      res.json({
         success: true,
         data: reservations,
      } as ApiResponse<Reservation[]>);
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const createReservationController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { spotId, startTime, endTime, notes }: CreateReservationInput =
         req.body;
      const userId = req.user?.id;

      if (!userId) {
         res.status(400).json({
            success: false,
            error: "User ID is required",
         } as ApiResponse<null>);
         return;
      }

      const reservation = await createReservation({
         userId,
         spotId,
         startTime,
         endTime,
         notes,
      });

      res.status(201).json({
         success: true,
         data: reservation,
      } as ApiResponse<Reservation>);
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const cancelReservationController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
         res.status(400).json({
            success: false,
            error: "User ID is required",
         } as ApiResponse<null>);
         return;
      }

      await cancelReservation(id, userId);

      res.json({
         success: true,
         message: "Reservation cancelled successfully",
      } as ApiResponse<null>);
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const confirmReservationPaymentController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { id } = req.params;
      const staffId = req.user?.id;

      if (!staffId) {
         res.status(400).json({
            success: false,
            error: "Staff ID is required",
         } as ApiResponse<null>);
         return;
      }

      const reservation = await confirmReservationPayment(id, staffId);

      res.json({
         success: true,
         data: reservation,
      } as ApiResponse<Reservation>);
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const getPendingCashPaymentsController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const pendingPayments = await getPendingCashPayments();

      res.json({
         success: true,
         data: pendingPayments,
      } as ApiResponse<Reservation[]>);
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};
