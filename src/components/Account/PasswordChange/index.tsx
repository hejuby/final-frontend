import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "./index.module.scss";

const PasswordChange = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>비밀번호 변경하기</h2>
        <p>새로운 비밀번호를 입력해주세요.</p>
      </header>
      <form className={styles.form}>
        <Input id="email" type="password" label="비밀번호" full />
        <Input
          id="email"
          type="password"
          label="비밀번호 확인"
          full
          infoMessage="8자 이상의 영문, 숫자, 특수문자 중 2가지 이상 사용"
        />
      </form>
      <div className={styles["button-container"]}>
        <Link href="/">
          <Button size="medium" full>
            확인
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PasswordChange;
