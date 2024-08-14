import { createElement, ButtonHTMLAttributes } from "react";
import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

type ButtonProps = {
  color?: "solid" | "outline" | "outline--gray";
  size?: "small" | "medium" | "large";
  full?: boolean;
} & {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const cn = ms(styles, "button");

const Button = ({
  children,
  color = "solid",
  size = "small",
  full = false,
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) =>
  createElement(
    "button",
    {
      className: cn(`--color-${color}`, `--size-${size}`, full && "--full"),
      type: type === "submit" ? "submit" : "button",
      disabled,
      ...props,
    },
    children,
  );

export default Button;
