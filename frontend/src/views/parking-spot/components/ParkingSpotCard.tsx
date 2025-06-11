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
   const countdown =
      reservationStatus === "CONFIRMED" && reservation?.endTime
         ? useCountdown(new Date(reservation.endTime))
         : null;

   const getCardStyles = () => {
      if (!spot.isActive) return "bg-gray-200 border border-gray-300 text-gray-500";

      switch (reservationStatus) {
         case "PENDING":
            return "bg-yellow-100 text-yellow-800 border border-yellow-300";
         case "CONFIRMED":
            return "bg-red-500 text-white border border-red-600";
         default:
            return "bg-green-100 text-green-800 border border-green-300";
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
         <span className="text-xs font-medium mt-1">
            ⏳ {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
         </span>
      );
   };

   return (
      <Card
         onClick={() => onClick(spot)}
         className={`cursor-pointer transition duration-200 hover:shadow-lg rounded-xl p-2 flex items-center justify-center text-center h-[100px] sm:h-[120px] ${getCardStyles()}`}
      >
         <CardContent className="flex flex-col items-center justify-center p-2 w-full h-full">
            <h1 className="text-lg font-semibold">{spot.spotNumber}</h1>
            <span className="text-xs mt-1 font-medium">
               {spot.isActive ? getStatusLabel() : "Tidak Aktif"}
            </span>
            {renderCountdown()}
         </CardContent>
      </Card>
   );
};