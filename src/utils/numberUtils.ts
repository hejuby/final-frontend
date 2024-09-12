import _ from "lodash";

/** 3자리 수마다 콤마 처리 */
const setComma = (str: string | number): string => {
  const parts = _.toString(str).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export default setComma;
