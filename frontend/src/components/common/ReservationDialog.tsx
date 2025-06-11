"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ParkingSpot } from "@/types";

interface ReservationDialogProps {
   open: boolean;
   onClose: () => void;
   spot: ParkingSpot;
   onSubmit: (spotId: string) => void;
}

export function ReservationDialog({ open, onClose, spot, onSubmit }: ReservationDialogProps) {
   const [loading, setLoading] = useState(false);

   const handleConfirm = async () => {
      setLoading(true);
      await onSubmit(spot.id);
      setLoading(false);
      onClose();
   };

   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle>Konfirmasi Reservasi</DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
               <p className="text-sm text-muted-foreground">
                  Apakah Anda yakin ingin memesan tempat parkir ini?
               </p>
               <div className="text-sm">
                  <p><strong>Nomor Spot:</strong> {spot.spotNumber}</p>
                  <p><strong>Lokasi:</strong> {spot.location}</p>
                  <p><strong>Lantai:</strong> {spot.floor}</p>
                  <p><strong>Harga per jam:</strong> Rp{spot.pricePerHour.toLocaleString()}</p>
               </div>
            </div>

            <DialogFooter className="pt-4">
               <Button variant="outline" onClick={onClose} disabled={loading}>
                  Batal
               </Button>
               <Button onClick={handleConfirm} disabled={loading}>
                  {loading ? "Memproses..." : "Pesan Sekarang"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}