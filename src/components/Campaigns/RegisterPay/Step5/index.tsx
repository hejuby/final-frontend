"use client";

import { useEffect } from "react";
import { Step5Data } from "@/@types/register";
import Input from "@/components/Input";
import BoxRadioButton from "@/components/BoxRadioButton";
import styles from "./index.module.scss";

interface PayStep5Props {
  stepData: Step5Data;
  setStepData: (data: Step5Data) => void;
}

const PayStep5: React.FC<PayStep5Props> = ({ stepData, setStepData }) => {
  const handlePointChange = (value: string) => {
    const pointPayment = value === "yes";
    setStepData({
      ...stepData,
      pointPayment,
    });
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capacity = Number(e.target.value);
    setStepData({
      ...stepData,
      capacity,
    });
  };

  const handlePointPerPersonChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const pointPerPerson = Number(e.target.value);
    setStepData({
      ...stepData,
      pointPerPerson,
    });
  };

  useEffect(() => {
    if (stepData.pointPayment && stepData.capacity && stepData.pointPerPerson) {
      const totalPoint = stepData.capacity * stepData.pointPerPerson * 1.2;
      setStepData({
        ...stepData,
        totalPoint,
      });
    } else {
      setStepData({
        ...stepData,
        totalPoint: 0,
      });
    }
  }, [stepData.capacity, stepData.pointPerPerson, stepData.pointPayment]);

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>모집 인원 / 지급 포인트</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>8. 모집 인원</h4>
          <Input
            label="총 모집 인원 수"
            id="request"
            type="textarea"
            full
            unit="명"
            value={stepData.capacity || ""}
            onChange={handleCapacityChange}
          />
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>9. 지급 포인트</h4>
          <div className={styles["radio-wrapper"]}>
            <BoxRadioButton
              options={[
                { value: "yes", optionLabel: "예" },
                { value: "no", optionLabel: "아니오" },
              ]}
              onChange={handlePointChange}
              selectedValue={stepData.pointPayment ? "yes" : "no"}
              label="포인트 지급 여부"
            />
          </div>
          <p className={styles["info-message"]}>
            📢 포인트를 지급할 경우 프리미엄 체험단으로 등록되어 양질의
            인플루언서가 지원할 확률이 높아집니다.
          </p>
          {stepData.pointPayment && (
            <div className={styles["input-container"]}>
              <Input
                label="1인당 지급 포인트"
                id="onePoint"
                type="number"
                unit="Point"
                disabled={!stepData.pointPayment}
                full
                value={stepData.pointPerPerson || ""}
                onChange={handlePointPerPersonChange}
              />
              <Input
                label="총 지급 포인트"
                id="totalPoint"
                type="number"
                unit="Point"
                gap={6}
                full
                value={stepData.totalPoint || ""}
                disabled
              />
              <p className={styles["info-message"]}>
                = 총 모집 인원 수 X 1인당 지급 포인트 X 수수료 20%
              </p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default PayStep5;
