const formatDate = (
  dateString: string | undefined,
  format: "YMD" | "MDMH" | "AbbrYMD",
) => {
  if (!dateString) {
    return null;
  }
  // YYYY-MM-DD-HH-MM-SS
  const [year, month, day, hour, minute] = dateString.split("-");
  const shortYear = year.slice(2);
  const parseMonth = parseInt(month, 10).toString();
  const parseDay = parseInt(day, 10).toString();
  if (format === "YMD") {
    return `${year}년 ${month}월 ${day}월`;
  }
  if (format === "MDMH") {
    return `${month}/${day} ${hour}:${minute}`;
  }
  if (format === "AbbrYMD") {
    return `${shortYear}년 ${parseMonth}월 ${parseDay}일`;
  }
  return null;
};

export default formatDate;
