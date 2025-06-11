/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { parkingService } from "@/services/parkingSpotService";
import type { ParkingSpot } from "@/types";

interface ParkingStore {
   spots: ParkingSpot[];
   selectedSpot: ParkingSpot | null;
   loading: boolean;
   error: string | null;

   fetchSpots: () => Promise<void>;
   selectSpot: (spot: ParkingSpot | null) => void;
}

export const useParkingStore = create<ParkingStore>((set) => ({
   spots: [],
   selectedSpot: null,
   loading: false,
   error: null,

   fetchSpots: async () => {
      set({ loading: true, error: null });
      try {
         const spots = await parkingService.getAll();
         set({ spots });
      } catch (err: any) {
         set({
            error: err.message || "Gagal mengambil data tempat parkir",
         });
      } finally {
         set({ loading: false });
      }
   },

   selectSpot: (spot) => set({ selectedSpot: spot }),
}));
