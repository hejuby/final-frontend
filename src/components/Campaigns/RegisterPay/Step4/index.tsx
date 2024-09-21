import { Step4Data } from "@/@types/register";
import Input from "@/components/Input";
import styles from "./index.module.scss";

interface PayStep4Props {
  stepData: Step4Data;
  setStepData: (data: Step4Data) => void;
}

const PayStep4: React.FC<PayStep4Props> = ({ stepData, setStepData }) => {
  const handleRequirementChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setStepData({
      ...stepData,
      requirement: e.target.value,
    });
  };

  const handleKeywordChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newKeywords = [...(stepData?.keywords || ["", "", ""])];
      newKeywords[index] = e.target.value;
      setStepData({
        ...stepData,
        keywords: newKeywords,
      });
    };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>미션</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>6. 사업주 미션</h4>
          <textarea
            className={styles.textarea}
            id="requirement"
            placeholder="1,000자 이내로 요구 사항을 자세히 작성"
            maxLength={1000}
            value={stepData?.requirement || ""}
            onChange={handleRequirementChange}
            style={{ width: "100%", height: "250px", resize: "none" }}
          />
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>7. 홍보용 키워드</h4>
          <div className={styles["input-container"]}>
            <Input
              id="keyword1"
              type="text"
              placeholder="키워드 1"
              full
              gap={0}
              maxLength={10}
              value={stepData?.keywords?.[0] || ""}
              onChange={handleKeywordChange(0)}
            />
            <Input
              id="keyword2"
              type="text"
              placeholder="키워드 2"
              full
              gap={0}
              maxLength={10}
              value={stepData?.keywords?.[1] || ""}
              onChange={handleKeywordChange(1)}
            />
            <Input
              id="keyword3"
              type="text"
              placeholder="키워드 3"
              full
              gap={0}
              maxLength={10}
              value={stepData?.keywords?.[2] || ""}
              onChange={handleKeywordChange(2)}
            />
          </div>
          <p className={styles["info-message"]}>
            해시태그로 사용할 키워드를 10자 이내로 적어주세요.
          </p>
        </article>
      </div>
    </section>
  );
};
export default PayStep4;
