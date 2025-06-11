import { ReactNode } from "react";
import Link from "next/link";
import { NavbarUser } from "@/components/base/NavbarUser";

export default function UserLayout({ children }: { children: ReactNode }) {
   return (
      <div className="min-h-screen bg-gray-50">
         <NavbarUser />
         <main className="flex-1 p-4">
            {children}
         </main>
      </div>
   );
}