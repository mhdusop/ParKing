import { API } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import type { Reservation } from "@/types";

export const reservationService = {
   getAll: async () => {
      const res = await fetch(API.RESERVATIONS.BASE, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
               document?.cookie
                  ?.split("; ")
                  ?.find((row) => row.startsWith("token="))
                  ?.split("=")[1] ?? ""
            }`,
         },
      });

      if (!res.ok) throw new Error("Gagal mengambil reservasi");

      const { data } = await res.json();
      return data;
   },

   getMyReservations: async (): Promise<Reservation[]> => {
      const token = useAuthStore.getState().token;

      const res = await fetch(API.RESERVATIONS.MY_RESERVATIONS, {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
      });

      if (!res.ok) throw new Error("Gagal mengambil daftar reservasi");

      const json = await res.json();
      return json.data;
   },

   createReservation: async (payload: {
      spotId: string;
      startTime: string;
      endTime: string;
      notes?: string;
   }): Promise<Reservation> => {
      const res = await fetch(API.RESERVATIONS.BASE, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            ...payload,
            paymentType: "CASH",
         }),
      });

      if (!res.ok) throw new Error("Gagal membuat reservasi");
      const json = await res.json();
      return json.data;
   },

   cancelReservation: async (id: string): Promise<void> => {
      const res = await fetch(API.RESERVATIONS.BY_ID(id), {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (!res.ok) throw new Error("Gagal membatalkan reservasi");
   },
};
