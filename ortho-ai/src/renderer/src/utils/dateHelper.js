export const formatDate = (dateString) => {
  // Supondo dateString no formato "YYYY-MM-DD" ou "YYYY-MM-DDTHH:mm:ss"
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
};
