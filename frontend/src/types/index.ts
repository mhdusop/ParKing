export type UserRole = "USER" | "STAFF" | "ADMIN";
export type ReservationStatus =
   | "PENDING"
   | "CONFIRMED"
   | "CANCELLED"
   | "COMPLETED";
export type PaymentType = "CASH" | "ONLINE";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface User {
   id: string;
   email: string;
   name: string;
   phone?: string;
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
   totalAmount: string;
   notes?: string;
   user: User;
   spot: ParkingSpot;
   payment?: Payment;
   createdAt: string;
   updatedAt: string;
}
export interface Payment {
   id: string;
   reservationId: string;
   amount: string;
   status: PaymentStatus;
   method: PaymentType;
   paidAt?: string;
   processedBy?: string;
   reservation: Reservation;
   staff?: User;
   createdAt: string;
   updatedAt: string;
}
