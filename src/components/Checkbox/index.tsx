import { InputHTMLAttributes, createElement } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Image from "next/image";
import ms from "@/utils/modifierSelector";
import iconCheckboxCheckedSrc from "@/assets/icons/icon-checkbox-checked.svg";
import styles from "./index.module.scss";

type CheckboxProps = {
  id: string;
  register?: UseFormRegisterReturn<string>;
  children?: React.ReactNode;
  gap?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const cn = ms(styles, "checkbox");

const Checkbox = ({ id, register, children, gap, ...props }: CheckboxProps) => {
  return (
    <label
      className={cn()}
      htmlFor={register ? register.name : ""}
      style={{ gap }}
    >
      {createElement("input", {
        type: "checkbox",
        className: cn("__input"),
        id,
        ...register,
        ...props,
      })}
      <label className={cn("__label")} htmlFor={id}>
        <Image src={iconCheckboxCheckedSrc} alt="Icon Check" />
      </label>
      {children}
    </label>
  );
};

export default Checkbox;
