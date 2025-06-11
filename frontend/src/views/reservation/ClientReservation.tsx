"use client";

import { useEffect } from "react";
import { useReservationStore } from "@/store/useReservationStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClientReservation() {
   const { reservations, fetchReservations, cancel, loading, error } =
      useReservationStore();

   useEffect(() => {
      fetchReservations();
   }, []);

   return (
      <div className="max-w-4xl mx-auto py-6 px-4">
         <h1 className="text-2xl font-bold mb-4">Reservasi Saya</h1>

         {loading && <p>Memuat reservasi...</p>}
         {error && <p className="text-red-500">{error}</p>}

         {reservations.length === 0 && !loading && (
            <p className="text-gray-500">Belum ada reservasi.</p>
         )}

         <div className="grid gap-4">
            {reservations.map((res) => (
               <Card key={res.id}>
                  <CardContent className="p-4 space-y-1">
                     <div className="flex justify-between items-center">
                        <div>
                           <p className="font-semibold">
                              Spot #{res.spot.spotNumber} – {res.spot.location}
                           </p>
                           <p className="text-sm">
                              {new Date(res.startTime).toLocaleString("id-ID")} →{" "}
                              {new Date(res.endTime).toLocaleString("id-ID")}
                           </p>
                           <p className="text-sm text-gray-500">Status: {res.status}</p>
                        </div>

                        {res.status === "PENDING" && (
                           <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => cancel(res.id)}
                           >
                              Batalkan
                           </Button>
                        )}
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}