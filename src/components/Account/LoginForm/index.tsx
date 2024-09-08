"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import useDialog from "@/hooks/useDialog";
import IconKakao from "@/assets/icons/icon-kakao.svg";
import IconNaver from "@/assets/icons/icon-naver.svg";
import IconGoogle from "@/assets/icons/icon-google.svg";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const initialState = { email: "", password: "" };

const LoginForm = () => {
  const router = useRouter();

  const { alert } = useDialog();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    // console.log(formData);

    try {
      const response = await axios.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const result = response.data;

        if (result.success) {
          // 로그인 성공
          router.push("/");
        } else {
          // 로그인 실패
          await alert("아이디 또는 비밀번호를 확인해주세요.");
        }
      } else {
        // 상태 코드가 200이 아닌 경우
        await alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      // 네트워크 오류 또는 서버 오류
      console.error("로그인 에러:", error);
      await alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  // const onError = async () => {
  //   await alert("아이디 또는 비밀번호를 확인해주세요.");
  // };

  const handleKakaoLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    router.push(kakaoAuthURL);
  };

  const handleNaverLogin = () => {
    const naverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`;
    router.push(naverAuthURL);
  };

  const handleGoogleLogin = () => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}.apps.googleusercontent.com&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
    router.push(googleAuthURL);
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>로그인</h2>
      </header>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            id="email"
            type="email"
            label="이메일"
            full
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+\/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: "유효한 이메일을 입력해주세요",
              },
            })}
            error={errors.email?.message}
          />
        </div>
        <div>
          <Input
            id="password"
            type="password"
            label="비밀번호"
            full
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자 이상이어야 합니다",
              },
              pattern: {
                value:
                  /((?=.*[a-zA-Z])(?=.*[\W_]))|((?=.*[a-zA-Z])(?=.*\d))|((?=.*\d)(?=.*[\W_]))/,
                message:
                  "비밀번호는 영문, 숫자, 특수문자 중 2가지를 포함해야 합니다",
              },
            })}
            error={errors.password?.message}
          />
        </div>
        <div className={styles["button-container"]}>
          <Button type="submit" size="medium" full>
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
            <button
              type="button"
              className={`${styles.social__item} ${styles["social__item-kakao"]}`}
              aria-label="카카오 로그인"
              onClick={handleKakaoLogin}
            >
              <IconKakao width="19px" height="19px" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${styles.social__item} ${styles["social__item-naver"]}`}
              aria-label="네이버 로그인"
              onClick={handleNaverLogin}
            >
              <IconNaver width="19px" height="19px" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${styles.social__item} ${styles["social__item-google"]}`}
              aria-label="구글 로그인"
              onClick={handleGoogleLogin}
            >
              <IconGoogle width="30px" height="30px" />
            </button>
          </li>
        </ul>
      </div>

      <p className={styles["signup-text"]}>
        아직 회원가입을 안하셨다면?{" "}
        <Link href="/auth/signup">회원가입하기</Link>
      </p>
    </section>
  );
};

export default LoginForm;
