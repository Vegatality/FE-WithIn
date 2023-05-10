export const dateConvert = (date) => {
  const createdDate = new Date(date);
  const formattedDate = createdDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return formattedDate;
};
