"use client";

import { useState } from "react";
import Input from "@/components/Input";
import BoxRadioButton from "@/components/BoxRadioButton";
import styles from "./index.module.scss";

const VisitStep5 = () => {
  const [isPoint, setIsPoint] = useState<string | null>(null);

  const handlePointChange = (value: string) => {
    setIsPoint(value);
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>모집 인원 / 지급 포인트</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>10. 모집 인원</h4>
          <Input
            label="총 모집 인원 수"
            id="request"
            type="textarea"
            full
            unit="명"
          />
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>11. 지급 포인트</h4>
          <div className={styles["radio-wrapper"]}>
            <BoxRadioButton
              options={[
                { value: "yes", optionLabel: "예" },
                { value: "no", optionLabel: "아니오" },
              ]}
              onChange={handlePointChange}
              selectedValue={isPoint}
              label="포인트 지급 여부"
            />
          </div>
          <p className={styles["info-message"]}>
            📢 포인트를 지급할 경우 프리미엄 체험단으로 등록되어 양질의
            인플루언서가 지원할 확률이 높아집니다.
          </p>
          <div className={styles["input-container"]}>
            <Input
              label="1인당 지급 포인트"
              id="onePoint"
              type="number"
              unit="Point"
              disabled
              full
            />
            <Input
              label="총 지급 포인트"
              id="totalPoint"
              type="number"
              unit="Point"
              gap={6}
              full
            />
            <p className={styles["info-message"]}>
              = 총 모집 인원 수 X 1인당 지급 포인트 X 수수료 20%
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
export default VisitStep5;
