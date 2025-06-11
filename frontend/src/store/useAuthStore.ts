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

   login: (email: string, password: string) => Promise<void>;
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
               const { token } = await authService.login({
                  email,
                  password,
               });

               document.cookie = `token=${token}; path=/; max-age=86400`;
               set({ token, error: null });
            } catch (err) {
               set({
                  error:
                     err instanceof Error
                        ? err.message
                        : "Login gagal, coba lagi.",
               });
            }
         },

         logout: () => set({ token: null, user: null, error: null }),
      }),
      {
         name: "auth-storage",
      }
   )
);
