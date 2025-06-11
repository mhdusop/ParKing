const API_BASE_URL =
   process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const API = {
   AUTH: {
      LOGIN: `${API_BASE_URL}/auth/login`,
      REGISTER: `${API_BASE_URL}/auth/register`,
   },

   PARKING_SPOTS: {
      BASE: `${API_BASE_URL}/parking`,
      BY_ID: (id: string) => `${API_BASE_URL}/parking/${id}`,
      STATUS: (id: string) => `${API_BASE_URL}/parking/${id}/status`,
      DELETE: (id: string) => `${API_BASE_URL}/parking/${id}`,
   },

   RESERVATIONS: {
      BASE: `${API_BASE_URL}/reservations`,
      MY_RESERVATIONS: `${API_BASE_URL}/reservations/my-reservations`,
      BY_ID: (id: string) => `${API_BASE_URL}/reservations/${id}`,
      CONFIRM: (id: string) => `${API_BASE_URL}/reservations/${id}/confirm`,
      PENDING_CASH: `${API_BASE_URL}/reservations/pending-cash`,
   },

   PAYMENTS: {
      BASE: `${API_BASE_URL}/payments`,
      BY_ID: (id: string) => `${API_BASE_URL}/payments/${id}`,
   },
} as const;
