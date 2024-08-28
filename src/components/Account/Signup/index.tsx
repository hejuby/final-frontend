import IconKakao from "@/assets/icons/icon-kakao.svg";
import IconNaver from "@/assets/icons/icon-naver.svg";
import IconGoogle from "@/assets/icons/icon-google.svg";
import Link from "next/link";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import IconInfluencer from "@/assets/icons/icon-signup-influencer.svg";
import IconEmployer from "@/assets/icons/icon-signup-employer.svg";
import styles from "./index.module.scss";

const Signup = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>회원가입</h2>
        <p>가입하실 계정의 유형을 선택해 주세요.</p>
      </header>
      <form className={styles.form}>
        <div className={styles["radio-container"]}>
          <IconInfluencer />
          <Checkbox
            id="influencer"
            type="radio"
            name="signup-option"
            width={24}
            gap={8}
          >
            인플루언서
          </Checkbox>
        </div>
        <div className={styles["radio-container"]}>
          <IconEmployer />
          <Checkbox
            id="employer"
            type="radio"
            name="signup-option"
            width={24}
            gap={8}
          >
            사업주
          </Checkbox>
        </div>
      </form>
      <div className={styles["button-wrapper"]}>
        <Button size="medium" full>
          회원가입 하기
        </Button>
      </div>
      <div className={styles["social-container"]}>
        <h3>
          <span>소셜계정으로 회원가입</span>
        </h3>
        <ul className={styles.social__list}>
          <li>
            <Link
              href="/account/signup"
              className={`${styles.social__item} ${styles["social__item-kakao"]}`}
            >
              <IconKakao width="26px" height="24px" />
              카카오로 회원가입
            </Link>
          </li>
          <li>
            <Link
              href="/account/signup"
              className={`${styles.social__item} ${styles["social__item-naver"]}`}
            >
              <IconNaver width="21px" height="20px" />
              네이버로 회원가입
            </Link>
          </li>
          <li>
            <Link
              href="/account/signup"
              className={`${styles.social__item} ${styles["social__item-google"]}`}
            >
              <IconGoogle width="22px" height="22px" />
              구글로 회원가입
            </Link>
          </li>
        </ul>
      </div>

      <p className={styles["signiup-text"]}>
        이미 계정이 있으신가요?
        <Link href="/account/login">로그인</Link>
      </p>
    </section>
  );
};

export default Signup;
