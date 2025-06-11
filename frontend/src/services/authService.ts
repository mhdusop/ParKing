import { API } from "@/lib/api";

interface LoginPayload {
   email: string;
   password: string;
}

export const authService = {
   login: async (payload: LoginPayload): Promise<{ token: string }> => {
      const res = await fetch(API.AUTH.LOGIN, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      if (!res.ok) {
         throw new Error("Login gagal");
      }

      const { data } = await res.json();
      return data;
   },
};
