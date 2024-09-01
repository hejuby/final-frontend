import { InputHTMLAttributes, createElement } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

type ToggleSwitchProps = {
  id: string;
  register?: UseFormRegisterReturn<string>;
} & InputHTMLAttributes<HTMLInputElement>;

const toggle = ms(styles, "toggle");

const ToggleSwitch = ({ id, register, ...props }: ToggleSwitchProps) => {
  return (
    <label htmlFor={register ? register.name : ""} className={styles.wrapper}>
      {createElement("input", {
        type: "checkbox",
        className: toggle(),
        id,
        ...register,
        ...props,
      })}
    </label>
  );
};

export default ToggleSwitch;
