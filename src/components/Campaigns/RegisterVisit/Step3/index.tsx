"use client";

import { useState } from "react";
import Selectbox, { Option } from "@/components/Selectbox";
import Checkbox from "@/components/Checkbox";
import styles from "./index.module.scss";

const VisitStep3 = () => {
  const [selectedStartTime, setSelectedStartTime] = useState<Option | null>(
    null,
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Option | null>(null);

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>체험 정보</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>6. 체험 가능 요일</h4>
          <div className={styles["checkbox-container"]}>
            <Checkbox id="mon" type="checkbox" width={24} gap={12}>
              월
            </Checkbox>
            <Checkbox id="tue" type="checkbox" width={24} gap={12}>
              화
            </Checkbox>
            <Checkbox id="wed" type="checkbox" width={24} gap={12}>
              수
            </Checkbox>
            <Checkbox id="thu" type="checkbox" width={24} gap={12}>
              목
            </Checkbox>
            <Checkbox id="fri" type="checkbox" width={24} gap={12}>
              금
            </Checkbox>
            <Checkbox id="sat" type="checkbox" width={24} gap={12}>
              토
            </Checkbox>
            <Checkbox id="sun" type="checkbox" width={24} gap={12}>
              일
            </Checkbox>
          </div>
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>7. 체험 가능 시간</h4>
          <div className={styles["select-container"]}>
            <Selectbox
              label="시작 시간"
              placeholder="선택"
              selected={selectedStartTime}
              options={[
                { optionLabel: "9:00", value: "blog" },
                { optionLabel: "10:00", value: "instagram" },
                { optionLabel: "유튜브", value: "youtube" },
                { optionLabel: "틱톡", value: "tictock" },
                { optionLabel: "릴스", value: "reels" },
                { optionLabel: "쇼츠", value: "shorts" },
              ]}
              onChange={setSelectedStartTime}
            />
            <Selectbox
              label="종료 시간"
              placeholder="선택"
              selected={selectedEndTime}
              options={[
                { optionLabel: "18:00", value: "visit" },
                { optionLabel: "구매형", value: "pay" },
                { optionLabel: "배송형", value: "delivery" },
                { optionLabel: "기자단", value: "editor" },
                { optionLabel: "포장", value: "pack" },
              ]}
              onChange={setSelectedEndTime}
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
