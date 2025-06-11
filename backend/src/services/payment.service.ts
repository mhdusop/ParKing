import prisma from "../utils/prisma";
import { Payment, PaymentStatus, PaymentType } from "@prisma/client";

export const createPayment = async (
   reservationId: string,
   amount: number,
   method: PaymentType,
   processedBy?: string
): Promise<Payment> => {
   try {
      const existingPayment = await prisma.payment.findUnique({
         where: { reservationId },
      });

      if (existingPayment) {
         throw new Error(
            `Payment already exists for reservationId: ${reservationId}`
         );
      }

      const payment = await prisma.payment.create({
         data: {
            reservationId,
            amount,
            method,
            status: PaymentStatus.PAID,
            paidAt: new Date(),
            processedBy,
         },
      });

      await prisma.reservation.update({
         where: { id: reservationId },
         data: { status: "CONFIRMED" },
      });

      return payment;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error creating payment: ${error.message}`);
      }
      throw new Error(`Error creating payment`);
   }
};

export const getPaymentById = async (id: string): Promise<Payment | null> => {
   return await prisma.payment.findUnique({
      where: { id },
      include: { reservation: true },
   });
};

export const getAllPayments = async (): Promise<Payment[]> => {
   return await prisma.payment.findMany({
      include: { reservation: true },
      orderBy: { createdAt: "desc" },
   });
};
