import { createElement } from "react";
import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

type LineProps = {
  type?: "thick" | "thin";
};

const cn = ms(styles, "line");

const Line = ({ type = "thin" }: LineProps) => {
  return createElement("div", {
    className: cn(`--type-${type}`),
  });
};

export default Line;
