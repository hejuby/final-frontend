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
  const date = new Date(`${year}-${month}-${day}`);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekdays[date.getDay()];

  if (format === "YMD") {
    return `${year}년 ${month}월 ${day}월`;
  }
  if (format === "MDMH") {
    return `${month}/${day} ${hour}:${minute}`;
  }
  if (format === "AbbrYMD") {
    return `${shortYear}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  }
  if (format === "YMDDay") {
    return `${shortYear}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일 (${dayOfWeek})`;
  }
  return null;
};

export default formatDate;
