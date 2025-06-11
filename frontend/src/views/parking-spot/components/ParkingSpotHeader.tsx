import { CarFront } from "lucide-react";

export function ParkingSpotHeader() {
   return (
      <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
         <h1 className="text-2xl font-bold">Daftar Tempat Parkir</h1>
         <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
               <CarFront className="text-red-500" size={14} />
               <span>Dipesan</span>
            </div>
            <div className="flex items-center gap-1">
               <CarFront className="text-yellow-500" size={14} />
               <span>Menunggu</span>
            </div>
            <div className="flex items-center gap-1">
               <CarFront className="text-green-700" size={14} />
               <span>Tersedia</span>
            </div>
            <div className="flex items-center gap-1">
               <CarFront className="text-gray-400" size={14} />
               <span>Tidak Aktif</span>
            </div>
         </div>
      </div>
   )
}