"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import useDialog from "@/hooks/useDialog";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Selectbox, { Option } from "@/components/Selectbox";
import SNSInput from "@/components/SNSInput";
import TermsCheck from "@/components/TermsCheck";
import styles from "./index.module.scss";
import Authentication from "../../Authentication";

const initialState = {
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  nickname: "",
  signupPath: "",
  sns: {
    naverBlog: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    etc: "",
  },
  termsCheck: {
    terms: false,
    privacy: false,
    marketing: false,
  },
};

const SignupFormInfluencer = () => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const { alert } = useDialog();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    setValue,
    trigger,
  } = useForm({
    shouldFocusError: true,
    defaultValues: initialState,
  });

  const emailValue = watch("email");

  const [name, setName] = useState("");

  // 이메일 중복체크
  const handleCheckEmailOverlap = async () => {
    if (!emailValue) {
      await alert("이메일을 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/sign-up/email/check", {
        email: emailValue,
      });

      if (response.data.exists) {
        setError("email", {
          type: "manual",
          message: "이미 사용 중인 이메일입니다.",
        });
        setIsEmailChecked(false);
      } else {
        clearErrors("email");
        setIsEmailChecked(true);
        await alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.error("이메일 중복체크 오류:", error);
      await alert("이메일 중복체크에 실패했습니다.");
    }
  };

  // 회원가입 제출
  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    // 이메일 중복체크
    // if (!isEmailChecked) {
    //   await alert("이메일 중복체크를 해주세요.");
    //   return;
    // }

    // SNS 체크
    const { naverBlog, instagram, youtube, tiktok, etc } = formData.sns;
    if (!naverBlog && !instagram && !youtube && !tiktok && !etc) {
      setError("sns", {
        type: "manual",
        message: "최소 1개의 값을 입력해주세요.",
      });
      await trigger("sns");
      return;
    } else {
      clearErrors("sns"); // 유효한 경우 에러를 지웁니다.
    }

    // console.log("폼 제출:", formData);

    localStorage.setItem("name", formData.name);

    router.push("/auth/signup-complete/influencer");
  };

  // 회원가입 제출 실패
  const onError = async (errors) => {
    await alert("필수 항목을 모두 입력해 주세요.");
    console.log(errors);
    console.log(errors.sns);
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>인플루언서 회원가입</h2>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles["email-check"]}>
          <Input
            id="email"
            type="email"
            label="이메일"
            maxLength={100}
            full
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+\/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: "유효한 이메일을 입력해주세요",
              },
            })}
          />
          <Button
            size="medium"
            color="outline"
            type="button"
            onClick={handleCheckEmailOverlap}
          >
            중복체크
          </Button>
          <p className={styles["error-message"]}>{errors.email?.message}</p>
        </div>

        <div className={styles["password-check"]}>
          <Input
            id="password"
            type="password"
            label="비밀번호"
            maxLength={50}
            full
            gap={5}
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
          <Input
            id="passwordConfirm"
            type="password"
            maxLength={50}
            full
            infoMessage="8자 이상의 영문, 숫자, 특수문자 중 2가지이상"
            {...register("passwordConfirm", {
              required: "비밀번호를 한번 더 입력해주세요.",
              validate: {
                check: (passwordConfirm) => {
                  if (getValues("password") !== passwordConfirm) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                },
              },
            })}
            error={errors.passwordConfirm?.message}
          />
        </div>
        <Authentication setName={setName} />
        <Input
          id="name"
          type="text"
          label="이름"
          maxLength={50}
          full
          readOnly
          value={name}
        />
        <Input
          id="nickname"
          type="text"
          full
          label="닉네임"
          maxLength={10}
          infoMessage="한글, 영문, 숫자 10자까지 (커뮤니티에서 사용할 닉네임)"
          {...register("nickname", {
            required: "닉네임을 입력해 주세요.",
            maxLength: {
              value: 10,
              message: "닉네임은 최대 10자까지 가능합니다.",
            },
            pattern: {
              value: /^[가-힣a-zA-Z0-9]+$/,
              message: "닉네임은 한글, 영문, 숫자만 가능합니다.",
            },
          })}
          error={errors.nickname?.message}
        />
        <Selectbox
          label="가입경로"
          placeholder="선택"
          selected={selectedItem}
          options={[
            { optionLabel: "포털 검색", value: "search" },
            { optionLabel: "SNS", value: "snsPath" },
            { optionLabel: "지인소개", value: "introduce" },
            { optionLabel: "기타", value: "etc" },
          ]}
          {...register("signupPath", {
            required: "가입경로를 선택해 주세요.",
          })}
          onChange={(option) => {
            setSelectedItem(option);
            setValue("signupPath", String(option?.value), {
              shouldValidate: true,
            });
          }}
        />
        {errors.signupPath && (
          <p className={styles["error-message"]}>{errors.signupPath.message}</p>
        )}
        <div className={styles["sns-container"]}>
          <p className={styles.title}>
            사용하실 SNS 주소{" "}
            <span className={styles["text-underline"]}>최소 1개</span>를
            입력해주세요.{" "}
            <span className={styles["text-require"]}>&#40;필수&#41;</span>
          </p>
          <SNSInput
            id="naverBlog"
            type="NAVER_BLOG"
            {...register("sns.naverBlog")}
            placeholder="네이버 블로그"
          />
          <SNSInput
            id="instagram"
            type="INSTAGRAM"
            {...register("sns.instagram")}
            placeholder="인스타그램"
          />
          <SNSInput
            id="youtube"
            type="YOUTUBE"
            {...register("sns.youtube")}
            placeholder="유튜브"
          />
          <SNSInput
            id="tiktok"
            type="TIKTOK"
            {...register("sns.tiktok")}
            placeholder="틱톡"
          />
          <SNSInput
            id="etc"
            type="ETC"
            {...register("sns.etc")}
            placeholder="기타 SNS"
          />
          {errors.sns && (
            <p className={styles["error-message"]}>{errors.sns.message}</p>
          )}
        </div>
        <TermsCheck
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />

        <div className={styles["button-container"]}>
          <Button size="medium" full type="submit">
            회원가입 하기
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignupFormInfluencer;
