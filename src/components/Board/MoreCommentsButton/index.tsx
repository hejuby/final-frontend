import { createElement, ButtonHTMLAttributes } from "react";
import IconDirectionDown from "@/assets/icons/icon-direction-down.svg";
import styles from "./index.module.scss";

interface MoreCommentsProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MoreCommentsButton = (props: MoreCommentsProps) =>
  createElement(
    "button",
    {
      type: "button",
      className: styles.button,
      ...props,
    },
    <>
      <p>댓글 더보기</p>
      <IconDirectionDown viewBox="0 0 24 24" />
    </>,
  );

export default MoreCommentsButton;
