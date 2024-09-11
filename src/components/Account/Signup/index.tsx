"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IconKakao from "@/assets/icons/icon-kakao.svg";
import IconNaver from "@/assets/icons/icon-naver.svg";
import IconGoogle from "@/assets/icons/icon-google.svg";
import Link from "next/link";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import IconInfluencer from "@/assets/icons/icon-signup-influencer.svg";
import IconEmployer from "@/assets/icons/icon-signup-employer.svg";
import useDialog from "@/hooks/useDialog";
import styles from "./index.module.scss";

const Signup = () => {
  const router = useRouter();

  const { alert } = useDialog();

  // 카카오
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  // 네이버
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${NAVER_REDIRECT_URI}`;

  // 구글
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}.apps.googleusercontent.com&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline`;

  const [selectSignupType, setSelectSignupType] = useState<string>("");

  const handleTypeChange = (type: string) => {
    setSelectSignupType(type);
  };

  const isSignupTypeSelect = (): boolean => {
    if (!selectSignupType) {
      alert("인플루언서 또는 사업주를 선택해 주세요.");
      return false;
    }
    return true;
  };

  const handleSocialLogin = (url: string) => {
    if (isSignupTypeSelect()) {
      router.push(url);
    }
  };
  // const handleKakaoLogin = async () => {
  //   if (await isSignupTypeSelect()) {
  //     router.push(KAKAO_AUTH_URL);
  //   }
  // };

  // const handleNaverLogin = async () => {
  //   if (await isSignupTypeSelect()) {
  //     router.push(NAVER_AUTH_URL);
  //   }
  // };

  // const handleGoogleLogin = async () => {
  //   if (await isSignupTypeSelect()) {
  //     router.push(GOOGLE_AUTH_URL);
  //   }
  // };

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
            onChange={() => handleTypeChange("influencer")}
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
            onChange={() => handleTypeChange("employer")}
          >
            사업주
          </Checkbox>
        </div>
      </form>
      <div className={styles["button-container"]}>
        <Button
          size="medium"
          full
          onClick={async () => {
            if (isSignupTypeSelect()) {
              router.push(`/auth/signup/${selectSignupType}`);
            }
          }}
        >
          회원가입 하기
        </Button>
      </div>
      <div className={styles["social-container"]}>
        <h3>
          <span>소셜계정으로 회원가입</span>
        </h3>
        <ul className={styles.social__list}>
          <li>
            <button
              type="button"
              className={`${styles.social__item} ${styles["social__item-kakao"]}`}
              aria-label="카카오로 회원가입"
              onClick={() => handleSocialLogin(KAKAO_AUTH_URL)}
            >
              <IconKakao width="26px" height="24px" />
              카카오로 회원가입
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${styles.social__item} ${styles["social__item-naver"]}`}
              aria-label="네이버 로그인"
              onClick={() => handleSocialLogin(NAVER_AUTH_URL)}
            >
              <IconNaver width="21px" height="20px" />
              네이버로 회원가입
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${styles.social__item} ${styles["social__item-google"]}`}
              aria-label="구글 로그인"
              onClick={() => handleSocialLogin(GOOGLE_AUTH_URL)}
            >
              <IconGoogle width="22px" height="22px" />
              구글로 회원가입
            </button>
          </li>
        </ul>
      </div>

      <p className={styles["signup-text"]}>
        이미 계정이 있으신가요?
        <Link href="/auth/login">로그인</Link>
      </p>
    </section>
  );
};

export default Signup;
