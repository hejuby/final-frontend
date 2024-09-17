const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

const formatDate = (
  dateString: string | undefined,
  format: "YMD" | "MDMH" | "AbbrYMD" | "YMDDay",
) => {
  if (!dateString) {
    return null;
  }
  // YYYY-MM-DDTHH:MM:SS.XXXXXX
  const [year, month, day, hour, minute] = dateString
    .split(".")[0]
    .split("T")
    .reduce((acc: string[], cur, index) => {
      index === 0
        ? cur.split("-").forEach((unit) => acc.push(unit))
        : cur.split(":").forEach((unit) => acc.push(unit));
      return acc;
    }, []);
  const shortYear = year.slice(2);
  const dayOfWeek = WEEKDAYS[new Date(dateString).getDay()];

  if (format === "YMD") {
    return `${year}년 ${month}월 ${day}월`;
  }
  if (format === "MDMH") {
    return `${month}/${day} ${hour}:${minute}`;
  }
  if (format === "AbbrYMD") {
    return `${shortYear}년 ${month}월 ${day}일`;
  }
  if (format === "YMDDay") {
    return `${shortYear}년 ${month}월 ${day}일 (${dayOfWeek})`;
  }
  return null;
};

export default formatDate;
