export const calculateTotalAmount = (
   startTime: Date,
   endTime: Date,
   pricePerHour: number
): number => {
   const hours = Math.ceil(
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
   );

   return hours * pricePerHour;
};
