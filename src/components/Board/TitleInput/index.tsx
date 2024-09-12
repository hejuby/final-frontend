import { createElement, InputHTMLAttributes } from "react";
import styles from "./index.module.scss";

interface TitleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
}

const TitleInput = ({ defaultValue, ...props }: TitleInputProps) =>
  createElement("input", {
    className: styles.input,
    placeholder: "제목을 입력해 주세요.",
    name: "formTitle",
    type: "text",
    defaultValue,
    ...props,
  });

export default TitleInput;
