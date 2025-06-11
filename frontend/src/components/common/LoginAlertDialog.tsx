"use client";

import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LoginAlertDialogProps {
   open: boolean;
   onClose: () => void;
}

export function LoginAlertDialog({ open, onClose }: LoginAlertDialogProps) {
   const router = useRouter();

   const redirectToLogin = () => {
      router.push("/auth/login");
   };

   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Login Diperlukan</DialogTitle>
               <DialogDescription>
                  Untuk memesan tempat parkir, Anda harus masuk terlebih dahulu.
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <Button onClick={redirectToLogin} className="text-white">
                  Login Sekarang
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}