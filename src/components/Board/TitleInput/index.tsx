import { createElement, InputHTMLAttributes } from "react";
import styles from "./index.module.scss";

interface TitleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
}

const TitleInput = ({ value, ...props }: TitleInputProps) =>
  createElement("input", {
    className: styles.input,
    placeholder: "제목을 입력해 주세요.",
    value,
    ...props,
  });

export default TitleInput;
