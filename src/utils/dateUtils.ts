export const formatDateToIsraelLocale = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });
};
