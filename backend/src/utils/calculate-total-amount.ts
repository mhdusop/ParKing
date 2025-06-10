export const calculateTotalAmount = (
   startTime: string | Date,
   endTime: string | Date,
   pricePerHour: number
): number => {
   const startDate =
      typeof startTime === "string" ? new Date(startTime) : startTime;
   const endDate = typeof endTime === "string" ? new Date(endTime) : endTime;

   if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date format for startTime or endTime.");
   }

   const hours = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
   );
   return hours * pricePerHour;
};
