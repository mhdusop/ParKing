import { useEffect, useState } from "react";

export function useCountdown(targetTime: Date) {
   const calculateTimeLeft = () => {
      const now = new Date();
      const difference = +targetTime - +now;
      if (difference <= 0) return null;

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { hours, minutes, seconds };
   };

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

   useEffect(() => {
      const interval = setInterval(() => {
         const updated = calculateTimeLeft();
         setTimeLeft(updated);
      }, 1000);

      return () => clearInterval(interval);
   }, [targetTime]);

   return timeLeft;
}
