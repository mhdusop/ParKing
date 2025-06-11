"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login, error } = useAuthStore();
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      await login(email, password);
      setLoading(false);

      const user = useAuthStore.getState().user;
      if (user) {
         router.push("/");
      }
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <h2 className="text-2xl font-bold">Login</h2>

         <div>
            <Label htmlFor="email">Email</Label>
            <Input
               id="email"
               type="email"
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
         </div>

         <div>
            <Label htmlFor="password">Password</Label>
            <Input
               id="password"
               type="password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
         </div>

         {error && <p className="text-sm text-red-500">{error}</p>}

         <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Masuk..." : "Login"}
         </Button>
      </form>
   );
}