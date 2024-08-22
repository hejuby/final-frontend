"use client";

import { InputHTMLAttributes, createElement } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ms from "@/utils/modifierSelector";
import IconCheckboxChecked from "@/assets/icons/icon-checkbox-checked.svg";
import styles from "./index.module.scss";

type CheckboxProps = {
  id: string;
  type: "checkbox" | "radio";
  register?: UseFormRegisterReturn<string>;
  children?: React.ReactNode;
  width?: number;
  gap?: number;
} & InputHTMLAttributes<HTMLInputElement>;

const label = ms(styles, "checkbox__label");

const Checkbox = ({
  id,
  type,
  register,
  children,
  width = 16,
  gap,
  ...props
}: CheckboxProps) => {
  const gapInPx = gap && `${gap}px`;
  const widthInPx = `${width}px`;
  const checkboxWidth = (width * 3) / 2;

  return (
    <label
      className={styles.checkbox}
      htmlFor={register ? register.name : ""}
      style={{ gap: gapInPx }}
    >
      {createElement("input", {
        type,
        className: styles.checkbox__input,
        id,
        ...register,
        ...props,
      })}
      <label
        className={label(`--type-${type}`)}
        style={{ width: widthInPx, height: widthInPx }}
        htmlFor={id}
      >
        {type === "checkbox" && (
          <IconCheckboxChecked
            style={{ width: checkboxWidth, height: checkboxWidth }}
            viewBox="0 0 24 24"
          />
        )}
        {type === "radio" && (
          <div style={{ width: (width * 5) / 12, height: (width * 5) / 12 }} />
        )}
      </label>
      {children}
    </label>
  );
};

export default Checkbox;
