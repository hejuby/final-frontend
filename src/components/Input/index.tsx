"use client";

import ms from "@/utils/modifierSelector";
import { InputHTMLAttributes, createElement, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import IconPasswordHidden from "@/assets/icons/icon-password-hidden.svg";
import IconPasswordVisible from "@/assets/icons/icon-password-visible.svg";
import styles from "./index.module.scss";

type InputProps = {
  id: string;
  label?: string;
  error?: string;
  full?: boolean;
  register?: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const cn = ms(styles, "input-field");

const Input = ({
  id,
  label,
  error,
  type = "text",
  full = false,
  register,
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className={cn("", error ? "--error" : "", full && "--full")}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles["input-wrap"]}>
        {createElement("input", {
          className: styles.input,
          id,
          type: inputType,
          ...register,
          ...props,
        })}
        {type === "password" && (
          <button
            type="button"
            className={styles["btn-toggle-pw"]}
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <IconPasswordHidden />
            ) : (
              <IconPasswordVisible />
            )}
          </button>
        )}
      </div>
      {error && <p className={styles["error-message"]}>{error}</p>}
    </div>
  );
};

export default Input;
