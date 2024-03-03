export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString(
    "en-GB",
    options as Intl.DateTimeFormatOptions,
  );
};
