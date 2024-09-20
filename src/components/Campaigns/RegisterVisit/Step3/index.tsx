"use client";

import { useEffect } from "react";
import Selectbox, { Option } from "@/components/Selectbox";
import { Step3Data } from "@/@types/register";
import Checkbox from "@/components/Checkbox";
import styles from "./index.module.scss";

interface VisitStep3Props {
  stepData: Step3Data;
  setStepData: (data: Step3Data) => void;
}

const generateTimeOptions = () => {
  const options: Option[] = [];
  for (let hour = 0; hour < 24; hour += 1) {
    const formattedHour = `${hour.toString().padStart(2, "0")}:00`;
    options.push({ optionLabel: formattedHour, value: formattedHour });
  }
  return options;
};

const days = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
  sun: "일",
};

const VisitStep3: React.FC<VisitStep3Props> = ({ stepData, setStepData }) => {
  const timeOptions = generateTimeOptions();

  useEffect(() => {
    if (!stepData.experienceStartTime) {
      setStepData({
        ...stepData,
        experienceStartTime: "09:00",
        experienceEndTime: "18:00",
      });
    }
  }, []);

  const handleDayChange = (day: string) => {
    const isSelected = stepData.availableDays.includes(day);
    const updatedDays = isSelected
      ? stepData.availableDays.filter((d) => d !== day)
      : [...stepData.availableDays, day];

    setStepData({
      ...stepData,
      availableDays: updatedDays,
    });
  };

  const handleStartTimeChange = (option: Option | null) => {
    setStepData({
      ...stepData,
      experienceStartTime: option ? String(option.value) : "",
    });
  };

  const handleEndTimeChange = (option: Option | null) => {
    setStepData({
      ...stepData,
      experienceEndTime: option ? String(option.value) : "",
    });
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>체험 정보</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>6. 체험 가능 요일</h4>
          <div className={styles["checkbox-container"]}>
            {Object.entries(days).map(([id, label]) => (
              <Checkbox
                key={id}
                id={id}
                type="checkbox"
                width={24}
                gap={12}
                checked={stepData.availableDays.includes(label)}
                onChange={() => handleDayChange(label)}
              >
                {label}
              </Checkbox>
            ))}
          </div>
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>7. 체험 가능 시간</h4>
          <div className={styles["select-container"]}>
            <Selectbox
              label="시작 시간"
              placeholder="선택"
              selected={
                timeOptions.find(
                  (option) => option.value === stepData.experienceStartTime,
                ) || null
              }
              options={timeOptions}
              onChange={handleStartTimeChange}
            />
            <Selectbox
              label="종료 시간"
              placeholder="선택"
              selected={
                timeOptions.find(
                  (option) => option.value === stepData.experienceEndTime,
                ) || null
              }
              options={timeOptions}
              onChange={handleEndTimeChange}
            />
          </div>
          <p className={styles["info-message"]}>
            📢 정확한 방문 날짜와 시간은 인플루언서와 직접 연락해서 정해주세요.
          </p>
        </article>
      </div>
    </section>
  );
};
export default VisitStep3;
