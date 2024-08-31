import React, { useState } from "react";
import styles from "./index.module.scss";

interface BoxRadioButtonsProps {
  options: { value: string; optionLabel: string }[];
  onChange: (value: string) => void;
  selectedValue?: string | null;
  label?: string;
  horizontal?: boolean;
}

const BoxRadioButton: React.FC<BoxRadioButtonsProps> = ({
  options,
  onChange,
  selectedValue,
  label,
  horizontal = false,
}) => {
  const [selectedRadioValue, setSelectedRadioValue] = useState<string | null>(
    selectedValue || null,
  );

  const handleRadioValueChange = (value: string) => {
    setSelectedRadioValue(value);
    onChange(value);
  };

  return (
    <div
      className={`${styles.container} ${horizontal ? styles.horizontal : ""}`}
    >
      <p className={styles.title}>{label}</p>
      <div className={styles["radio-wrapper"]}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`${styles["radio-button"]} ${selectedRadioValue === option.value ? styles.active : ""}`}
          >
            <input
              type="radio"
              value={option.value}
              checked={selectedRadioValue === option.value}
              onChange={() => handleRadioValueChange(option.value)}
              className={styles["radio-input"]}
            />
            {option.optionLabel}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BoxRadioButton;
