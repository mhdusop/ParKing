import { API } from "@/lib/api";
import type { ParkingSpot } from "@/types";

async function handleFetch<T>(
   input: RequestInfo,
   init?: RequestInit
): Promise<T> {
   const res = await fetch(input, {
      ...init,
      headers: {
         "Content-Type": "application/json",
         ...init?.headers,
      },
   });

   if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorBody}`);
   }

   return res.json() as Promise<T>;
}

export const parkingService = {
   getAll: async () => {
      const res = await fetch(`${API.PARKING_SPOTS.BASE}`);
      if (!res.ok) throw new Error("Gagal fetch data");
      const json = await res.json();
      return json.data;
   },

   getById: (id: string) =>
      handleFetch<ParkingSpot>(API.PARKING_SPOTS.BY_ID(id), {
         cache: "no-store",
      }),

   updateStatus: (id: string, status: string) =>
      handleFetch<ParkingSpot>(API.PARKING_SPOTS.STATUS(id), {
         method: "PATCH",
         body: JSON.stringify({ status }),
      }),

   deleteSpot: (id: string) =>
      handleFetch<{ success: boolean }>(API.PARKING_SPOTS.DELETE(id), {
         method: "DELETE",
      }),
};
