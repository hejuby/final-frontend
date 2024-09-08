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
import styles from "./index.module.scss";

const Signup = () => {
  const router = useRouter();

  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  const handleKakaoLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    router.push(kakaoAuthURL);
  };

  const handleNaverLogin = () => {
    const naverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${NAVER_REDIRECT_URI}`;
    router.push(naverAuthURL);
  };

  const handleGoogleLogin = () => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}.apps.googleusercontent.com&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
    router.push(googleAuthURL);
  };

  const [selectedSignupType, setSelectedSignupType] = useState("");

  const handleTypeChange = (type: string) => {
    setSelectedSignupType(type);
  };

  const getSignupPath = () => {
    if (selectedSignupType === "influencer") {
      return "/auth/signup/influencer";
    }
    if (selectedSignupType === "employer") {
      return "/auth/signup/employer";
    }
    return "/auth/signup";
  };

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
        <Link href={getSignupPath()}>
          <Button size="medium" full>
            회원가입 하기
          </Button>
        </Link>
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
              onClick={handleKakaoLogin}
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
              onClick={handleNaverLogin}
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
              onClick={handleGoogleLogin}
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
