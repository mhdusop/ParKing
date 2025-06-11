export interface User {
   id: string;
   email: string;
   name: string;
   phone: string | null;
   role: UserRole;
   createdAt: string;
   updatedAt: string;
}

export interface ParkingSpot {
   id: string;
   spotNumber: string;
   location: string;
   floor: string;
   isActive: boolean;
   pricePerHour: number;
   createdAt: string;
   updatedAt: string;
}

export interface Reservation {
   id: string;
   userId: string;
   spotId: string;
   startTime: string;
   endTime: string;
   status: ReservationStatus;
   paymentType: PaymentType;
   totalAmount: number;
   notes: string | null;
   spot?: ParkingSpot;
   user?: User;
   createdAt: string;
   updatedAt: string;
}

export interface Payment {
   id: string;
   reservationId: string;
   amount: number;
   status: PaymentStatus;
   method: PaymentType;
   paidAt: string | null;
   processedBy: string | null;
   reservation?: Reservation;
   createdAt: string;
   updatedAt: string;
}

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
}

export enum PaymentType {
   CASH = "CASH",
   ONLINE = "ONLINE",
}

export enum PaymentStatus {
   PENDING = "PENDING",
   PAID = "PAID",
   FAILED = "FAILED",
   REFUNDED = "REFUNDED",
}

export interface ApiResponse<T> {
   success: boolean;
   data?: T;
   error?: string;
   message?: string;
}

export interface LoginRequest {
   email: string;
   password: string;
}

export interface RegisterRequest {
   email: string;
   password: string;
   name: string;
   phone?: string;
}

export interface CreateReservationRequest {
   spotId: string;
   startTime: string;
   endTime: string;
   notes?: string;
}

export interface CreatePaymentRequest {
   reservationId: string;
   amount: number;
   method: PaymentType;
}

export interface LoginResponse {
   token: string;
}
