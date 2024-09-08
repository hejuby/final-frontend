"use client";

import { useState } from "react";
import Selectbox, { Option } from "@/components/Selectbox";
import Input from "@/components/Input";
import styles from "./index.module.scss";

const VisitStep1 = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Option | null>(null);
  const [selectedType, setSelectedType] = useState<Option | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>플랫폼 유형 / 제공서비스</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>
            1. 광고를 원하는 플랫폼과 광고 유형, 카테고리 선택{" "}
          </h4>
          <div className={styles["select-container"]}>
            <Selectbox
              label="플랫폼"
              placeholder="선택"
              selected={selectedPlatform}
              options={[
                { optionLabel: "블로그", value: "blog" },
                { optionLabel: "인스타그램", value: "instagram" },
                { optionLabel: "유튜브", value: "youtube" },
                { optionLabel: "틱톡", value: "tictock" },
                { optionLabel: "릴스", value: "reels" },
                { optionLabel: "쇼츠", value: "shorts" },
              ]}
              onChange={setSelectedPlatform}
            />
            <Selectbox
              label="유형"
              placeholder="선택"
              selected={selectedType}
              options={[
                { optionLabel: "방문형", value: "visit" },
                { optionLabel: "구매형", value: "pay" },
                { optionLabel: "배송형", value: "delivery" },
                { optionLabel: "기자단", value: "editor" },
                { optionLabel: "포장", value: "pack" },
              ]}
              onChange={setSelectedType}
            />
            <Selectbox
              label="카테고리"
              placeholder="선택"
              selected={selectedCategory}
              options={[
                { optionLabel: "맛집", value: "yammy" },
                { optionLabel: "뷰티", value: "beauty" },
                { optionLabel: "여행", value: "travel" },
                { optionLabel: "문화", value: "culture" },
                { optionLabel: "식품", value: "food" },
                { optionLabel: "생활", value: "living" },
                { optionLabel: "디지털", value: "digital" },
              ]}
              onChange={setSelectedCategory}
            />
          </div>
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>
            2. 인플루언서에게 제공할 서비스
          </h4>
          <Input
            id="service"
            type="text"
            placeholder="예시: 자율식사권 5만원권"
            gap={6}
            full
          />
          <p className={styles["info-message"]}>
            제공 상품명과 금액 등을 100자 이내로 입력해 주세요.
          </p>
        </article>
      </div>
    </section>
  );
};
export default VisitStep1;
