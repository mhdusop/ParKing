"use client";

import { useEffect, useState } from "react";
import type { ParkingSpot, Reservation } from "@/types";
import { useParkingStore } from "@/store/useParkingStore";
import { useReservationStore } from "@/store/useReservationStore";
import { ReservationDialog } from "@/components/common/ReservationDialog";
import { LoginAlertDialog } from "@/components/common/LoginAlertDialog";
import { useAuthStore } from "@/store/useAuthStore";
import { showError, showSuccess } from "@/utils/toast";
import { reservationService } from "@/services/reservationService";
import { ParkingSpotCard } from "./components/ParkingSpotCard";
import { ParkingSpotHeader } from "./components/ParkingSpotHeader";

interface ClientParkingProps {
   initialSpots: ParkingSpot[];
}

export default function ClientParking({ initialSpots }: ClientParkingProps) {
   const { spots, fetchSpots, loading, error } = useParkingStore();
   const { reservations, fetchReservations } = useReservationStore();
   const [showReservationModal, setShowReservationModal] = useState(false);
   const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
   const [showLoginAlert, setShowLoginAlert] = useState(false);
   const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
   const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
   const user = useAuthStore((state) => state.user);

   useEffect(() => {
      if (initialSpots && initialSpots.length > 0) {
         useParkingStore.setState({ spots: initialSpots });
      } else {
         fetchSpots();
      }

      fetchReservations();
   }, [initialSpots]);

   const renderSpots = spots.length > 0 ? spots : initialSpots;

   const reservationStatusMap: Record<string, string> = {};
   reservations.forEach((res) => {
      if (res.status !== "CANCELLED" && res.status !== "COMPLETED") {
         reservationStatusMap[res.spotId] = res.status;
      }
   });

   const handleSpotClick = (spot: ParkingSpot) => {
      const status = reservationStatusMap[spot.id];

      if (!user) {
         setShowLoginAlert(true);
         return;
      }

      if (!spot.isActive) {
         showError("Tempat parkir ini tidak aktif.");
         return;
      }

      if (status === "CONFIRMED") {
         showError("Tempat parkir ini sudah dibooking.");
         return;
      }

      const reservation = reservations.find(
         (res) => res.spotId === spot.id && res.status === "PENDING"
      );

      setSelectedReservation(reservation || null);
      setSelectedReservationId(reservation?.id || null);
      setSelectedSpot(spot);
      setShowReservationModal(true);
   };

   return (
      <div className="max-w-5xl mx-auto py-6">
         <ParkingSpotHeader />

         {loading && <p className="text-gray-500">Memuat tempat parkir...</p>}
         {error && <p className="text-red-500">{error}</p>}
         {renderSpots.length === 0 && !loading && (
            <p className="text-gray-600">Tidak ada tempat parkir tersedia.</p>
         )}

         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {renderSpots.map((spot) => {
               const status = reservationStatusMap[spot.id];
               const reservation = reservations.find(
                  (res) =>
                     res.spotId === spot.id &&
                     res.status !== "CANCELLED" &&
                     res.status !== "COMPLETED"
               );

               return (
                  <ParkingSpotCard
                     key={spot.id}
                     spot={spot}
                     reservationStatus={status}
                     reservation={reservation || null}
                     onClick={handleSpotClick}
                  />
               );
            })}
         </div>

         {selectedSpot && (
            <ReservationDialog
               open={showReservationModal}
               onClose={() => setShowReservationModal(false)}
               spot={selectedSpot}
               reservationId={selectedReservationId ?? undefined}
               onSubmit={async (spotId) => {
                  try {
                     const now = new Date();
                     const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

                     await reservationService.createReservation({
                        spotId,
                        startTime: now.toISOString(),
                        endTime: twoHoursLater.toISOString(),
                        notes: `Reservasi untuk spot ${selectedSpot?.spotNumber}`,
                     });

                     showSuccess("Reservasi berhasil dibuat!");
                     fetchReservations();
                  } catch (error: any) {
                     if (
                        error.message?.includes("401") ||
                        error.message?.toLowerCase().includes("unauthorized")
                     ) {
                        setShowReservationModal(false);
                        setShowLoginAlert(true);
                        return;
                     }
                     showError(error.message || "Gagal membuat reservasi.");
                  }
               }}
               onCancel={async (reservationId) => {
                  try {
                     await reservationService.cancelReservation(reservationId);
                     showSuccess("Reservasi berhasil dibatalkan.");
                     fetchReservations();
                     setShowReservationModal(false);
                  } catch (err: any) {
                     showError(err.message || "Gagal membatalkan reservasi.");
                  }
               }}
            />
         )}

         <LoginAlertDialog
            open={showLoginAlert}
            onClose={() => setShowLoginAlert(false)}
         />
      </div>
   );
}