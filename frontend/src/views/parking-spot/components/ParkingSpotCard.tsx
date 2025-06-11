import { Card, CardContent } from "@/components/ui/card";
import { ParkingSpot, Reservation } from "@/types";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
   spot: ParkingSpot;
   reservationStatus?: string;
   reservation: Reservation | null;
   onClick: (spot: ParkingSpot) => void;
}

export const ParkingSpotCard = ({
   spot,
   reservationStatus,
   reservation,
   onClick,
}: Props) => {
   const countdown = reservationStatus === "CONFIRMED" && reservation?.endTime
      ? useCountdown(new Date(reservation.endTime))
      : null;

   const getCardBgColor = () => {
      if (!spot.isActive) return "bg-gray-200 border-dashed border-gray-400";
      switch (reservationStatus) {
         case "PENDING":
            return "bg-yellow-300";
         case "CONFIRMED":
            return "bg-red-500";
         default:
            return "bg-green-100";
      }
   };

   const getTextColor = () => {
      switch (reservationStatus) {
         case "CONFIRMED":
            return "text-white";
         case "PENDING":
            return "text-gray-800";
         default:
            return "text-green-800";
      }
   };

   const getStatusLabel = () => {
      switch (reservationStatus) {
         case "PENDING":
            return "Menunggu";
         case "CONFIRMED":
            return "Dipesan";
         default:
            return "Tersedia";
      }
   };

   const renderCountdown = () => {
      if (!countdown) return null;
      const { hours, minutes, seconds } = countdown;
      return (
         <span className="text-sm mt-1 font-medium text-white">
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
         </span>
      );
   };

   return (
      <Card
         onClick={() => onClick(spot)}
         className={`cursor-pointer transition hover:shadow-md flex items-center justify-center text-center rounded-lg ${getCardBgColor()}`}
      >
         <CardContent className="p-4 flex flex-col items-center justify-center w-full h-full">
            <h1 className={`text-lg font-semibold ${getTextColor()}`}>
               {spot.spotNumber}
            </h1>
            <span className={`text-xs mt-1 font-medium ${getTextColor()}`}>
               {spot.isActive ? getStatusLabel() : "Tidak Aktif"}
            </span>
            {renderCountdown()}
         </CardContent>
      </Card>
   );
};
