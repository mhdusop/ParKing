import prisma from "../utils/prisma";
import { Reservation, CreateReservationInput } from "../types";
import { calculateTotalAmount } from "../utils/calculate-total-amount";
import { ReservationStatus, PaymentStatus, PaymentType } from "@prisma/client";

export const getAllReservations = async (): Promise<Reservation[]> => {
   try {
      const reservations = await prisma.reservation.findMany({
         include: {
            spot: true,
         },
         orderBy: { createdAt: "desc" },
      });

      return reservations.map((reservation) => ({
         id: reservation.id,
         userId: reservation.userId,
         spotId: reservation.spotId,
         startTime: reservation.startTime,
         endTime: reservation.endTime,
         status: reservation.status,
         paymentType: reservation.paymentType,
         totalAmount: reservation.totalAmount.toNumber(),
         notes: reservation.notes !== null ? reservation.notes : undefined,
         createdAt: reservation.createdAt,
         updatedAt: reservation.updatedAt,
         spot: {
            id: reservation.spot.id,
            spotNumber: reservation.spot.spotNumber,
            location: reservation.spot.location,
            floor: reservation.spot.floor,
            isActive: reservation.spot.isActive,
            pricePerHour: reservation.spot.pricePerHour.toNumber(),
            createdAt: reservation.spot.createdAt,
            updatedAt: reservation.spot.updatedAt,
         },
      }));
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error fetching reservations ${error.message}`);
      }
      throw new Error(`Error fetching reservations`);
   }
};

export const getMyReservations = async (
   userId: string
): Promise<Reservation[]> => {
   try {
      const reservations = await prisma.reservation.findMany({
         where: { userId },
         include: {
            spot: true,
         },
         orderBy: { createdAt: "desc" },
      });

      return reservations.map((reservation) => ({
         id: reservation.id,
         userId: reservation.userId,
         spotId: reservation.spotId,
         startTime: reservation.startTime,
         endTime: reservation.endTime,
         status: reservation.status,
         paymentType: reservation.paymentType,
         totalAmount: reservation.totalAmount.toNumber(),
         notes: reservation.notes !== null ? reservation.notes : undefined,
         createdAt: reservation.createdAt,
         updatedAt: reservation.updatedAt,
         spot: {
            id: reservation.spot.id,
            spotNumber: reservation.spot.spotNumber,
            location: reservation.spot.location,
            floor: reservation.spot.floor,
            isActive: reservation.spot.isActive,
            pricePerHour: reservation.spot.pricePerHour.toNumber(),
            createdAt: reservation.spot.createdAt,
            updatedAt: reservation.spot.updatedAt,
         },
      }));
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error fetching reservations ${error.message}`);
      }
      throw new Error(`Error fetching reservations`);
   }
};

export const createReservation = async (
   input: CreateReservationInput
): Promise<Reservation> => {
   try {
      const { userId, spotId, startTime, endTime, notes } = input;

      const spot = await prisma.parkingSpot.findUnique({
         where: { id: spotId },
      });

      if (!spot) {
         throw new Error("Parking spot not found");
      }

      const totalAmount = calculateTotalAmount(
         startTime,
         endTime,
         spot.pricePerHour.toNumber()
      );

      const reservation = await prisma.reservation.create({
         data: {
            userId,
            spotId,
            startTime,
            endTime,
            status: ReservationStatus.PENDING,
            paymentType: PaymentType.CASH,
            totalAmount,
            notes,
         },
      });

      return {
         ...reservation,
         totalAmount: reservation.totalAmount.toNumber(),
         notes: reservation.notes !== null ? reservation.notes : undefined,
      };
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error creating reservation: ${error.message}`);
      }
      throw new Error(`Error creating reservation`);
   }
};

export const cancelReservation = async (
   id: string,
   userId: string
): Promise<void> => {
   try {
      const reservation = await prisma.reservation.findUnique({
         where: { id },
      });
      if (!reservation || reservation.userId !== userId) {
         throw new Error("Reservation not found");
      }

      if (reservation.status !== ReservationStatus.PENDING) {
         throw new Error("Can only cancel pending reservations");
      }

      await prisma.reservation.update({
         where: { id },
         data: { status: ReservationStatus.CANCELLED },
      });
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error cancelling reservation: ${error.message}`);
      }
      throw new Error(`Error cancelling reservation`);
   }
};

export const confirmReservationPayment = async (
   id: string,
   staffId: string
): Promise<Reservation> => {
   try {
      const updatedReservation = await prisma.reservation.update({
         where: { id },
         data: {
            status: ReservationStatus.CONFIRMED,
            payment: {
               create: {
                  amount: 0,
                  method: PaymentType.CASH,
                  status: PaymentStatus.PAID,
                  paidAt: new Date(),
                  processedBy: staffId,
               },
            },
         },
         include: {
            spot: true,
         },
      });

      return {
         ...updatedReservation,
         totalAmount: updatedReservation.totalAmount.toNumber(),
         notes:
            updatedReservation.notes !== null
               ? updatedReservation.notes
               : undefined,
         spot: updatedReservation.spot
            ? {
                 ...updatedReservation.spot,
                 pricePerHour: updatedReservation.spot.pricePerHour.toNumber(),
              }
            : undefined,
      };
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(
            `Error confirming reservation payment: ${error.message}`
         );
      }
      throw new Error(`Error confirming reservation payment`);
   }
};

export const getPendingCashPayments = async (): Promise<Reservation[]> => {
   try {
      const reservations = await prisma.reservation.findMany({
         where: {
            status: ReservationStatus.PENDING,
            paymentType: PaymentType.CASH,
         },
         include: {
            user: true,
            spot: true,
         },
      });

      return reservations.map((reservation) => ({
         ...reservation,
         totalAmount: reservation.totalAmount.toNumber(),
         notes: reservation.notes !== null ? reservation.notes : undefined,
         spot: reservation.spot
            ? {
                 ...reservation.spot,
                 pricePerHour: reservation.spot.pricePerHour.toNumber(),
              }
            : undefined,
         user: reservation.user
            ? {
                 ...reservation.user,
              }
            : undefined,
      }));
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(
            `Error fetching pending cash payments: ${error.message}`
         );
      }
      throw new Error(`Error fetching pending cash payments`);
   }
};
