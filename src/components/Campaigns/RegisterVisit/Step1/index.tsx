"use client";

import Selectbox from "@/components/Selectbox";
import { Step1Data } from "@/@types/register";
import Input from "@/components/Input";
import styles from "./index.module.scss";

interface VisitStep1Props {
  stepData: Step1Data;
  setStepData: (data: Partial<Step1Data>) => void;
}

const VisitStep1: React.FC<VisitStep1Props> = ({ stepData, setStepData }) => {
  const platformOptions = [
    { optionLabel: "블로그", value: "BLOG" },
    { optionLabel: "인스타그램", value: "INSTAGRAM" },
    { optionLabel: "유튜브", value: "YOUTUBE" },
    { optionLabel: "틱톡", value: "TIKTOK" },
    { optionLabel: "릴스", value: "REELS" },
    { optionLabel: "쇼츠", value: "SHORTS" },
  ];

  const typeOptions = [
    { optionLabel: "방문형", value: "VISIT" },
    { optionLabel: "구매형", value: "PURCHASE" },
    { optionLabel: "배송형", value: "DELIVERY" },
    { optionLabel: "기자단", value: "PRESS_CORPS" },
    { optionLabel: "포장", value: "TAKEOUT" },
  ];

  const categoryOptions = [
    { optionLabel: "맛집", value: "FOOD" },
    { optionLabel: "뷰티", value: "BEAUTY" },
    { optionLabel: "여행", value: "TRAVEL" },
    { optionLabel: "문화", value: "CULTURE" },
    { optionLabel: "식품", value: "GROCERY" },
    { optionLabel: "생활", value: "LIFESTYLE" },
    { optionLabel: "디지털", value: "DIGITAL" },
  ];

  const findOptionLabel = (
    options: { optionLabel: string; value: string }[],
    value: string | null,
  ) => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.optionLabel : "";
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>플랫폼 유형 / 제공서비스</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>
            1. 광고를 원하는 플랫폼과 광고 유형, 카테고리 선택
          </h4>
          <div className={styles["select-container"]}>
            <Selectbox
              label="플랫폼"
              placeholder="선택"
              selected={
                stepData.platform
                  ? {
                      value: stepData.platform,
                      optionLabel: findOptionLabel(
                        platformOptions,
                        stepData.platform,
                      ),
                    }
                  : null
              }
              options={platformOptions}
              // @ts-ignore
              onChange={(option) => setStepData({ platform: option.value })}
            />
            <Selectbox
              label="유형"
              placeholder="선택"
              selected={
                stepData.type
                  ? {
                      value: stepData.type,
                      optionLabel: findOptionLabel(typeOptions, stepData.type),
                    }
                  : null
              }
              options={typeOptions}
              // @ts-ignore
              onChange={(option) => setStepData({ type: option.value })}
            />
            <Selectbox
              label="카테고리"
              placeholder="선택"
              selected={
                stepData.category
                  ? {
                      value: stepData.category,
                      optionLabel: findOptionLabel(
                        categoryOptions,
                        stepData.category,
                      ),
                    }
                  : null
              }
              options={categoryOptions}
              // @ts-ignore
              onChange={(option) => setStepData({ category: option.value })}
            />
          </div>
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>
            2. 인플루언서에게 제공할 서비스
          </h4>
          <Input
            id="serviceProvided"
            type="text"
            placeholder="예시: 자율식사권 5만원권"
            gap={6}
            full
            value={stepData.serviceProvided}
            onChange={(e) => setStepData({ serviceProvided: e.target.value })}
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
