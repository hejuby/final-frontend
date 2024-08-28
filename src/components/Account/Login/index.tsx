import IconKakao from "@/assets/icons/icon-kakao.svg";
import IconNaver from "@/assets/icons/icon-naver.svg";
import IconGoogle from "@/assets/icons/icon-google.svg";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const Login = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>로그인</h2>
      </header>
      <form className={styles.form}>
        <Input id="email" type="email" label="이메일" full />
        <Input id="password" type="password" label="비밀번호" full />
        <div className={styles["button-wrapper"]}>
          <Button size="medium" full>
            로그인
          </Button>
        </div>
      </form>
      <ul className={styles["link-container"]}>
        <li>
          <Link href="/auth/id-find">아이디 찾기</Link>
        </li>
        <li>
          <Link href="/auth/pw-find">비밀번호 찾기</Link>
        </li>
      </ul>
      <div className={styles["social-container"]}>
        <h3>
          <span>소셜계정 로그인</span>
        </h3>
        <ul className={styles.social__list}>
          <li>
            <Link
              href="/"
              className={`${styles.social__item} ${styles["social__item-kakao"]}`}
            >
              <IconKakao width="19px" height="19px" />
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`${styles.social__item} ${styles["social__item-naver"]}`}
            >
              <IconNaver width="19px" height="19px" />
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`${styles.social__item} ${styles["social__item-google"]}`}
            >
              <IconGoogle width="30px" height="30px" />
            </Link>
          </li>
        </ul>
      </div>

      <p className={styles["signiup-text"]}>
        아직 회원가입을 안하셨다면?{" "}
        <Link href="/auth/signup">회원가입하기</Link>
      </p>
    </section>
  );
};

export default Login;
