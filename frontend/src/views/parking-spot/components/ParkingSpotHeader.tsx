import { CarFront } from "lucide-react";

export function ParkingSpotHeader() {
   return (
      <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
         <h1 className="text-2xl font-bold">Daftar Tempat Parkir</h1>
         <div className="flex flex-wrap items-center gap-4 text-sm">
            <LegendItem color="text-red-500" label="Dipesan" />
            <LegendItem color="text-yellow-500" label="Menunggu" />
            <LegendItem color="text-green-600" label="Tersedia" />
            <LegendItem color="text-gray-400" label="Tidak Aktif" />
         </div>
      </div>
   );
}

const LegendItem = ({ color, label }: { color: string; label: string }) => (
   <div className="flex items-center gap-1">
      <CarFront className={`${color}`} size={16} />
      <span>{label}</span>
   </div>
);