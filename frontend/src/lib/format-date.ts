export const formatDate = (dateStr: string) => {
   const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   };
   return new Date(dateStr).toLocaleString("id-ID", options);
};
