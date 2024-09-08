"use client";

import ms from "@/utils/modifierSelector";
import {
  InputHTMLAttributes,
  createElement,
  forwardRef,
  useState,
} from "react";
import {
  UseFormRegisterReturn,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";
import IconPasswordHidden from "@/assets/icons/icon-password-hidden.svg";
import IconPasswordVisible from "@/assets/icons/icon-password-visible.svg";
import styles from "./index.module.scss";
import Label from "../Label";

export type InputProps = {
  id: string;
  label?: string;
  infoMessage?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  full?: boolean;
  gap?: number;
  horizontal?: boolean;
  unit?: string;
  register?: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const cn = ms(styles, "input-field");

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      infoMessage,
      error,
      type = "text",
      full = false,
      gap = 20,
      horizontal = false,
      unit,
      register,
      ...props
    }: InputProps,
    ref,
  ) => {
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordInputValue, setPasswordInputValue] = useState("");

    const handlePasswordFocus = () => {
      setIsPasswordFocused(true);
    };

    const handlePasswordInput = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setPasswordInputValue(event.target.value);
    };

    const handleTogglePasswordIcon = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const inputType = type === "password" && isPasswordVisible ? "text" : type;
    const showToggleButton =
      type === "password" && isPasswordFocused && passwordInputValue !== "";

    const getErrorMessage = (
      errorInput:
        | string
        | FieldError
        | Merge<FieldError, FieldErrorsImpl<any>>
        | undefined,
    ): string | undefined => {
      if (typeof errorInput === "string") {
        return errorInput;
      }
      if (errorInput && typeof errorInput.message === "string") {
        return errorInput.message;
      }
      return undefined;
    };

    return (
      <div
        className={cn(
          "",
          error ? "--error" : "",
          full && "--full",
          horizontal && "--horizontal",
        )}
        style={{
          marginBottom: `${gap}px`,
        }}
      >
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className={styles["input-wrapper"]}>
          {createElement("input", {
            className: styles.input,
            ref,
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
          {unit && <span className={styles.unit}>{unit}</span>}
          {infoMessage && (
            <p className={styles["info-message"]}>{infoMessage}</p>
          )}
          {error && (
            <p className={styles["error-message"]}>{getErrorMessage(error)}</p>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
