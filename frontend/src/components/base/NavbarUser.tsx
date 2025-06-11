"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
   NavigationMenu,
   NavigationMenuItem,
   NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function NavbarUser() {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
      <div className="w-full shadow-sm bg-white">
         <div className="mx-auto max-w-5xl px-4 py-4 w-full">
            <div className="flex items-center justify-between">
               <div className="font-bold text-xl">ParKing</div>

               <NavigationMenu className="hidden md:flex">
                  <NavigationMenuList className="space-x-10">
                     <NavigationMenuItem>
                        <Link href="/pages/parking" className="text-sm hover:underline">
                           Spot Parking
                        </Link>
                     </NavigationMenuItem>
                     <NavigationMenuItem>
                        <Link href="/pages/reservation" className="text-sm hover:underline">
                           My Reservation
                        </Link>
                     </NavigationMenuItem>
                  </NavigationMenuList>
               </NavigationMenu>

               <div className="md:hidden">
                  <button onClick={() => setMenuOpen(!menuOpen)}>
                     {menuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
               </div>
            </div>

            {menuOpen && (
               <div className="md:hidden mt-4 space-y-3">
                  <Link
                     href="/pages/parking"
                     className="block text-sm px-2 py-1 hover:bg-gray-100 rounded"
                     onClick={() => setMenuOpen(false)}
                  >
                     Spot Parking
                  </Link>
                  <Link
                     href="/pages/reservation"
                     className="block text-sm px-2 py-1 hover:bg-gray-100 rounded"
                     onClick={() => setMenuOpen(false)}
                  >
                     My Reservation
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
}