export enum UserRole {
   USER = "USER",
   STAFF = "STAFF",
   ADMIN = "ADMIN",
}

export enum ReservationStatus {
   PENDING = "PENDING",
   CONFIRMED = "CONFIRMED",
   CANCELLED = "CANCELLED",
   COMPLETED = "COMPLETED",
   EXPIRED = "EXPIRED",
}

export enum PaymentMethod {
   CASH = "CASH",
   ONLINE = "ONLINE",
   CARD = "CARD",
}

export enum PaymentStatus {
   PENDING = "PENDING",
   PAID = "PAID",
   FAILED = "FAILED",
   REFUNDED = "REFUNDED",
}

export interface User {
   id: string;
   email: string;
   name: string;
   phone?: string;
   role: UserRole;
   createdAt: Date;
   updatedAt: Date;
}

export interface ParkingSpot {
   id: string;
   number: string;
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
   parkingSpotId: string;
   startTime: Date;
   endTime: Date;
   status: ReservationStatus;
   paymentMethod: PaymentMethod;
   totalAmount: number;
   notes?: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface Payment {
   id: string;
   reservationId: string;
   userId: string;
   amount: number;
   method: PaymentMethod;
   status: PaymentStatus;
   paidAt?: Date;
   createdAt: Date;
   updatedAt: Date;
}

export interface ApiResponse<T> {
   success: boolean;
   data?: T;
   error?: string;
}
