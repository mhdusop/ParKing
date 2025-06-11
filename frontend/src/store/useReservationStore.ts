import { create } from "zustand";
import { reservationService } from "@/services/reservationService";
import type { Reservation } from "@/types";

interface ReservationStore {
   reservations: Reservation[];
   loading: boolean;
   error: string | null;

   fetchReservations: () => Promise<void>;
   create: (args: {
      spotId: string;
      startTime: string;
      endTime: string;
      notes?: string;
   }) => Promise<void>;
   cancel: (id: string) => Promise<void>;
}

export const useReservationStore = create<ReservationStore>((set, get) => ({
   reservations: [],
   loading: false,
   error: null,

   fetchReservations: async () => {
      set({ loading: true, error: null });
      try {
         const data = await reservationService.getMyReservations();
         set({ reservations: data });
      } catch (err) {
         set({
            error:
               err instanceof Error
                  ? err.message
                  : "Gagal mengambil data reservasi",
         });
      } finally {
         set({ loading: false });
      }
   },

   create: async (payload) => {
      set({ loading: true, error: null });
      try {
         await reservationService.createReservation(payload);
         await get().fetchReservations();
      } catch (err) {
         set({
            error:
               err instanceof Error ? err.message : "Gagal membuat reservasi",
         });
      } finally {
         set({ loading: false });
      }
   },

   cancel: async (id) => {
      set({ loading: true, error: null });
      try {
         await reservationService.cancelReservation(id);
         await get().fetchReservations();
      } catch (err) {
         set({
            error:
               err instanceof Error
                  ? err.message
                  : "Gagal membatalkan reservasi",
         });
      } finally {
         set({ loading: false });
      }
   },
}));
