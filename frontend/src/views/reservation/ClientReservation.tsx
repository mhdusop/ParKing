"use client";

import { useEffect } from "react";
import { useReservationStore } from "@/store/useReservationStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";

export default function ClientReservation() {
   const { reservations, fetchReservations, cancel, loading, error } = useReservationStore();

   useEffect(() => {
      fetchReservations();
   }, []);

   return (
      <div className="max-w-5xl mx-auto py-6">
         <h1 className="text-2xl font-bold mb-6">
            Reservasi Saya
         </h1>

         {loading && <p className="text-center text-gray-600">Memuat reservasi...</p>}
         {error && <p className="text-red-500 text-center">{error}</p>}

         {reservations.length === 0 && !loading && (
            <p className="text-center text-gray-500">Belum ada reservasi.</p>
         )}

         <div className="grid gap-6 md:grid-cols-2">
            {reservations.map((res) => (
               <Card
                  key={res.id}
                  className="bg-white border py-0 border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow"
               >
                  <CardContent className="p-5 space-y-3">
                     <div className="space-y-3">
                        <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                           Spot {res.spot.spotNumber} – {res.spot.location}
                        </h2>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                           <span className="inline-block bg-muted rounded-full">🕒</span>
                           <span>
                              {formatDate(res.startTime)} → {formatDate(res.endTime)}
                           </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                           <span className="inline-block bg-muted rounded-full">📝</span>
                           <span>Catatan: {res.notes || "Tidak ada"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                           <span className="inline-block bg-muted rounded-full">💰</span>
                           <span>
                              Total:{" "}
                              <span className="text-green-600 font-semibold">
                                 Rp {Number(res.totalAmount).toLocaleString("id-ID")}
                              </span>
                           </span>
                        </div>

                     </div>
                     <div className="flex items-center justify-between mt-7">
                        <p className="text-sm text-gray-500">
                           Status:{" "}
                           <span
                              className={`font-semibold ${res.status === "PENDING"
                                 ? "text-yellow-600"
                                 : res.status === "CANCELLED"
                                    ? "text-red-600"
                                    : "text-green-600"
                                 }`}
                           >
                              {res.status}
                           </span>
                        </p>

                        {res.status === "PENDING" && (
                           <div className="text-right">
                              <Button
                                 variant="destructive"
                                 size="sm"
                                 onClick={() => cancel(res.id)}
                              >
                                 Batalkan
                              </Button>
                           </div>
                        )}
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}