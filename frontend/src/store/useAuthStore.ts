import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";

interface User {
   id: string;
   email: string;
   name: string;
   role: string;
}

interface AuthState {
   token: string | null;
   user: User | null;
   error: string | null;

   login: (email: string, password: string) => Promise<boolean>;
   logout: () => void;
}

export const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         token: null,
         user: null,
         error: null,

         login: async (email, password) => {
            try {
               const response = await authService.login({ email, password });

               const token = response.token;
               const user = response.user;

               document.cookie = `token=${token}; path=/; max-age=86400`;

               set({ token, user, error: null });
               return true;
            } catch (err: any) {
               set({
                  error:
                     err?.response?.data?.message ||
                     "Login gagal, periksa email dan password.",
               });
               return false;
            }
         },

         logout: () => {
            document.cookie = "token=; path=/; max-age=0";
            set({ token: null, user: null, error: null });
         },
      }),
      {
         name: "auth-storage",
      }
   )
);
