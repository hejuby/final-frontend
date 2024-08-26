"use client";

import React, { useState } from "react";
import ms from "@/utils/modifierSelector";
import IconDirectionDown from "@/assets/icons/icon-direction-down-20.svg";
import IconDirectionUp from "@/assets/icons/icon-direction-up-20.svg";
import styles from "./index.module.scss";
import Label from "../Label";

export type Option = {
  optionLabel: string;
  value: string | number;
};

interface SelectProps {
  label?: string;
  placeholder?: string;
  size?: "default" | "small" | "medium";
  options: Option[];
  selected: Option | null;
  onChange: (selection: Option) => void;
}

const cn = ms(styles, "select-container");

const Selectbox = ({
  label,
  placeholder,
  size = "default",
  selected,
  options,
  onChange,
}: SelectProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowOptions((prev) => !prev);
    } else if (e.key === "Escape") {
      setShowOptions(false);
    }
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    option: Option,
  ) => {
    if (e.key === "Enter") {
      onChange(option);
      setShowOptions(false);
    }
  };

  return (
    <div className={cn(`--size-${size}`)}>
      {label && <Label htmlFor="selectbox">{label}</Label>}
      <div
        id="selectbox"
        onClick={() => setShowOptions(!showOptions)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className={styles.select}
        aria-expanded={showOptions ? "true" : "false"}
      >
        <span>{selected ? selected.optionLabel : placeholder}</span>
        {showOptions ? (
          <IconDirectionUp width="20px" height="20px" />
        ) : (
          <IconDirectionDown width="20px" height="20px" />
        )}
      </div>
      {showOptions && (
        <ul className={styles.option}>
          {options.map((option) => (
            <li
              onClick={() => {
                onChange(option);
                setShowOptions(false);
              }}
              onKeyDown={(e) => handleOptionKeyDown(e, option)}
              key={option.value}
              className={styles.option__item}
              tabIndex={0}
              role="option"
              aria-selected={selected?.value === option.value}
            >
              <span>{option.optionLabel}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Selectbox;
