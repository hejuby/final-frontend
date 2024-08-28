import React, { useState } from "react";
import styles from "./index.module.scss";

interface GenderRadioButtonsProps {
  options: { value: string; optionLabel: string }[];
  onChange: (value: string) => void;
  selectedValue?: string | null;
  label?: string;
}

const GenderRadioButtons: React.FC<GenderRadioButtonsProps> = ({
  options,
  onChange,
  selectedValue,
  label,
}) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(
    selectedValue || null,
  );

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
    onChange(gender);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{label}</p>
      <div className={styles["radio-wrapper"]}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`${styles["radio-button"]} ${selectedGender === option.value ? styles.active : ""}`}
          >
            <input
              type="radio"
              value={option.value}
              checked={selectedGender === option.value}
              onChange={() => handleGenderChange(option.value)}
              className={styles["radio-input"]}
            />
            {option.optionLabel}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenderRadioButtons;
