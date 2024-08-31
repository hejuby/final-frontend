import Input from "@/components/Input";
import styles from "./index.module.scss";

const VisitStep4 = () => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>미션</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>8. 사업주 요청사항</h4>
          <Input
            id="request"
            type="textarea"
            placeholder="1,000자 이내로 요구 사항을 자세히 작성"
            full
          />
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>9. 홍보용 키워드</h4>
          <div className={styles["input-container"]}>
            <Input
              id="keyword1"
              type="text"
              placeholder="키워드 1"
              full
              gap={0}
            />
            <Input
              id="keyword2"
              type="text"
              placeholder="키워드 2"
              full
              gap={0}
            />
            <Input
              id="keyword3"
              type="text"
              placeholder="키워드 3"
              full
              gap={0}
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
export default VisitStep4;
