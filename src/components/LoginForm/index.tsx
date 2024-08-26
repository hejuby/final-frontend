"use client";

import ms from "@/utils/modifierSelector";
import IconKakao from "@/assets/icons/icon-kakao.svg";
import IconNaver from "@/assets/icons/icon-naver.svg";
import IconGoogle from "@/assets/icons/icon-google.svg";
import Link from "next/link";
import Button from "../Button";
import Input from "../Input";
import styles from "./index.module.scss";

const cn = ms(styles, "login");

const LoginForm = () => {
  return (
    <section className={cn("-container")}>
      <h2 className={styles.account__title}>로그인</h2>
      <form className={cn("__form")}>
        <Input id="email" type="email" label="이메일" full />
        <Input id="password" type="password" label="비밀번호" full />
        <div className={cn("__button-wrapper")}>
          <Button size="medium" full>
            로그인
          </Button>
        </div>
      </form>
      <ul className={cn("__link-container")}>
        <li>
          <Link href="/account/signup">아이디 찾기</Link>
        </li>
        <li>
          <Link href="/account/login">비밀번호 찾기</Link>
        </li>
      </ul>
      <div className={cn("__social")}>
        <h3>소셜계정 로그인</h3>
        <ul className={cn("__social__link-container")}>
          <li>
            <Link
              href="/account/signup"
              className={cn("__social__link", "__social__link-kakao")}
            >
              <IconKakao width="22px" height="23px" />
            </Link>
          </li>
          <li>
            <Link
              href="/account/signup"
              className={cn("__social__link", "__social__link-naver")}
            >
              <IconNaver width="19px" height="19px" />
            </Link>
          </li>
          <li>
            <Link
              href="/account/signup"
              className={cn("__social__link", "__social__link-google")}
            >
              <IconGoogle width="30px" height="30px" />
            </Link>
          </li>
        </ul>
      </div>

      <p className={cn("__signiup-text")}>
        아직 회원가입을 안하셨다면? <Link href="/">회원가입하기</Link>
      </p>
    </section>
  );
};

export default LoginForm;
