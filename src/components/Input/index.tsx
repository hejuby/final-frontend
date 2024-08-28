"use client";

import ms from "@/utils/modifierSelector";
import { InputHTMLAttributes, createElement, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import IconPasswordHidden from "@/assets/icons/icon-password-hidden.svg";
import IconPasswordVisible from "@/assets/icons/icon-password-visible.svg";
import styles from "./index.module.scss";
import Label from "../Label";

type InputProps = {
  id: string;
  label?: string;
  infoMessage?: string;
  error?: string;
  full?: boolean;
  register?: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const cn = ms(styles, "input-field");

const Input = ({
  id,
  label,
  infoMessage,
  error,
  type = "text",
  full = false,
  register,
  ...props
}: InputProps) => {
  const [isPassworFocused, setIsPassworFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState("");

  const handlePasswordFocus = () => {
    setIsPassworFocused(true);
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue(event.target.value);
  };

  const handleTogglePasswordIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;
  const showToggleButton =
    type === "password" && isPassworFocused && passwordInputValue !== "";

  return (
    <div className={cn("", error ? "--error" : "", full && "--full")}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className={styles["input-wrapper"]}>
        {createElement("input", {
          className: styles.input,
          id,
          type: inputType,
          onFocus: handlePasswordFocus,
          onInput: handlePasswordInput,
          ...register,
          ...props,
        })}
        {showToggleButton && (
          <button
            type="button"
            className={styles["button-toggle-pw"]}
            onClick={handleTogglePasswordIcon}
          >
            {isPasswordVisible ? (
              <IconPasswordVisible />
            ) : (
              <IconPasswordHidden />
            )}
          </button>
        )}
      </div>
      {error && <p className={styles["error-message"]}>{error}</p>}
      {infoMessage && <p className={styles["info-message"]}>{infoMessage}</p>}
    </div>
  );
};

export default Input;
