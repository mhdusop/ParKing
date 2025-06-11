import { UserRole, ReservationStatus, PaymentType } from "@prisma/client";

export enum PaymentStatus {
   PENDING = "PENDING",
   PAID = "PAID",
   FAILED = "FAILED",
   REFUNDED = "REFUNDED",
}

export interface User {
   id: string;
   email: string;
   password: string;
   name: string;
   phone?: string | null;
   role: UserRole;
   createdAt: Date;
   updatedAt: Date;
}

export interface ParkingSpot {
   id: string;
   spotNumber: string;
   location: string;
   floor: string;
   isActive: boolean;
   pricePerHour: number;
   createdAt: Date;
   updatedAt: Date;
}

export interface Reservation {
   id: string;
   userId: string;
   spotId: string;
   startTime: Date;
   endTime: Date;
   status: ReservationStatus;
   paymentType: PaymentType;
   totalAmount: number;
   notes?: string;
   createdAt: Date;
   updatedAt: Date;
   spot?: ParkingSpot;
   user?: User;
   payment?: Payment;
}

export interface CreateReservationInput {
   userId: string;
   spotId: string;
   startTime: Date;
   endTime: Date;
   notes?: string;
}

export interface UpdateReservationInput {
   status?: ReservationStatus;
   notes?: string;
}

export interface Payment {
   id: string;
   reservationId: string;
   userId: string;
   amount: number;
   method: PaymentType;
   status: PaymentStatus;
   paidAt?: Date;
   processedBy?: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface ApiResponse<T> {
   success: boolean;
   data?: T;
   error?: string;
}
