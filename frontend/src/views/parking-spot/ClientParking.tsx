"use client";

import { useEffect } from "react";
import type { ParkingSpot } from "@/types";
import { useParkingStore } from "@/store/useParkingStore";
import { Card, CardContent } from "@/components/ui/card";

interface ClientParkingProps {
   initialSpots: ParkingSpot[];
}

export default function ClientParking({ initialSpots }: ClientParkingProps) {
   const { spots, fetchSpots, loading, error, selectSpot } = useParkingStore();

   useEffect(() => {
      if (initialSpots && initialSpots.length > 0) {
         useParkingStore.setState({ spots: initialSpots });
      } else {
         fetchSpots();
      }
   }, [initialSpots, fetchSpots]);

   const renderSpots = spots.length > 0 ? spots : initialSpots;

   return (
      <div className="max-w-6xl mx-auto p-6">
         <h1 className="text-2xl font-bold mb-4">Daftar Tempat Parkir</h1>

         {loading && <p className="text-gray-500">Memuat tempat parkir...</p>}
         {error && <p className="text-red-500">{error}</p>}

         {renderSpots.length === 0 && !loading && (
            <p className="text-gray-600">Tidak ada tempat parkir tersedia.</p>
         )}

         <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
            {renderSpots.map((spot) => (
               <Card
                  key={spot.id}
                  className={`
                        cursor-pointer w-full h-full transition hover:shadow-md flex items-center justify-center border text-center
                        ${!spot.isActive ? "opacity-60 pointer-events-none" : ""}
                        rounded-lg
                    `}
                  onClick={() => selectSpot(spot)}
               >
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full w-full border-y-1 bg-gray-50">
                     <h1 className="text-lg font-semibold">{spot.spotNumber}</h1>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}