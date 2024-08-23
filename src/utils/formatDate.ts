const formatDate = (dateString: string, format: "YMD" | "MDMH") => {
  // YYYY-MM-DD-HH-MM-SS
  const [year, month, day, hour, minute] = dateString.split("-");
  if (format === "YMD") {
    return `${year}년 ${month}월 ${day}월`;
  }
  if (format === "MDMH") {
    return `${month}/${day} ${hour}:${minute}`;
  }
  return null;
};

export default formatDate;
