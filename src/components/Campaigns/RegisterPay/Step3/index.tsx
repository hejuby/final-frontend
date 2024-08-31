import Input from "@/components/Input";
import styles from "./index.module.scss";

const PayStep3 = () => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>서비스 안내</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>
            5. 서비스 상품 안내 / 구매처 URL
          </h4>
          <Input id="name" type="text" placeholder="URL 주소 입력" gap={6} />
          <p className={styles["info-message"]}>
            서비스 상품을 구매할 수 있는 URL이나 서비스 상품의 제공 내역을
            확인할 수 있는 URL을 입력해 주세요.
          </p>
        </article>
      </div>
    </section>
  );
};
export default PayStep3;
