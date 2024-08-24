import { createElement } from "react";
import styles from "./index.module.scss";

type FloatingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  bottom: string;
};

const FloatingButton = ({ children, bottom, ...props }: FloatingButtonProps) =>
  createElement(
    "button",
    { className: styles.button, type: "button", style: { bottom }, ...props },
    children,
  );

export default FloatingButton;
