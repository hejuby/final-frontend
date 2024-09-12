"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useDialog from "@/hooks/useDialog";
import axios from "axios";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Selectbox, { Option } from "@/components/Selectbox";
import TermsCheck from "@/components/TermsCheck";
import styles from "./index.module.scss";
import Authentication from "../../Authentication";

const initialState = {
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  nickname: "",
  joinPath: "",
  termsCheck: {
    terms: false,
    privacy: false,
    marketing: false,
  },
};

const SignupFormEmployer = () => {
  const router = useRouter();
  const { alert } = useDialog();
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    setValue,
  } = useForm({
    shouldFocusError: true,
    defaultValues: initialState,
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const emailValue = watch("email");
  const [name, setName] = useState("");
  const [impUid, setImpUid] = useState("");
  const [certified, setCertified] = useState<boolean>(false);

  // 이메일 중복체크
  const handleCheckEmail = async () => {
    if (!emailValue) {
      await alert("이메일을 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sing-up/email/check`,
        {
          email: emailValue,
        },
      );

      if (response.data.exists) {
        setError("email", {
          type: "manual",
          message: "이미 사용 중인 이메일입니다.",
        });
      } else {
        clearErrors("email");
        await alert("사용 가능한 이메일입니다.");
        setIsEmailChecked(true);
      }
    } catch (error) {
      console.error("이메일 중복체크 오류:", error);
      if (axios.isAxiosError(error)) {
        // AxiosError인 경우 처리
        if (error.response?.data?.message) {
          await alert(error.response.data.message);
        } else {
          await alert("이메일 중복체크에 실패했습니다.");
        }
      } else {
        // AxiosError가 아닌 일반 에러인 경우
        await alert("이메일 중복체크에 실패했습니다.");
      }
      setIsEmailChecked(false);
    }
  };

  // 회원가입 제출
  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    // 이메일 중복 체크
    if (!isEmailChecked) {
      await alert("이메일 중복체크를 해주세요.");
      return;
    }

    if (!certified) {
      await alert("통합인증을 완료해주세요.");
      return;
    }

    const submitData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      nickname: formData.nickname,
      joinPath: formData.joinPath,
      terms: formData.termsCheck.terms,
      personalInformation: formData.termsCheck.privacy,
      marketing: formData.termsCheck.marketing,
      impId: impUid,
    };

    console.log("폼 제출:", submitData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/enterpriser/sing-up`,
        submitData,
      );

      if (response.status === 200) {
        localStorage.setItem("name", formData.name);
        router.push("/auth/signup-complete/employer");
      } else {
        await alert(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      await alert("회원가입에 실패했습니다.");
    }
  };

  // 회원가입 제출 실패 - 필수 항목 입력
  const onError = async (formErrors: any) => {
    if (formErrors.email) {
      await alert("이메일을 확인해 주세요.");
    } else if (formErrors.password) {
      await alert("비밀번호를 확인해 주세요.");
    } else if (formErrors.nickname) {
      await alert("업체명을 확인해 주세요.");
    } else if (formErrors.joinPath) {
      await alert("가입경로를 확인해 주세요.");
    } else if (formErrors.termsCheck) {
      await alert("이용약관 동의를 확인해 주세요.");
    } else {
      await alert("필수 항목을 모두 입력해 주세요.");
    }
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>사업주 회원가입</h2>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles["email-check"]}>
          <Input
            id="email"
            type="email"
            label="이메일"
            maxLength={100}
            full
            register={register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "유효한 이메일을 입력해주세요",
              },
            })}
          />
          <Button
            size="medium"
            color="outline"
            type="button"
            onClick={handleCheckEmail}
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
            register={register("password", {
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
            infoMessage="8자 이상의 영문, 숫자, 특수문자 중 2가지 이상"
            register={register("passwordConfirm", {
              required: "비밀번호를 한번 더 입력해주세요.",
              validate: {
                check: (passwordConfirm) => {
                  if (getValues("password") !== passwordConfirm) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                  return true;
                },
              },
            })}
            error={errors.passwordConfirm?.message}
          />
        </div>
        <Authentication
          setName={setName}
          setImpUid={setImpUid}
          setCertified={setCertified}
        />
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
          label="업체명"
          maxLength={10}
          infoMessage="한글, 영문, 숫자 10자까지 (커뮤니티에서 사용할 닉네임)"
          register={register("nickname", {
            required: "업체명을 입력해 주세요.",
            maxLength: {
              value: 10,
              message: "업체명은 최대 10자까지 가능합니다.",
            },
            pattern: {
              value: /^[가-힣a-zA-Z0-9]+$/,
              message: "업체명은 한글, 영문, 숫자만 가능합니다.",
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
          {...register("joinPath", {
            required: "가입경로를 선택해 주세요.",
          })}
          onChange={(option) => {
            setSelectedItem(option);
            setValue("joinPath", String(option?.value), {
              shouldValidate: true,
            });
          }}
        />
        {errors.joinPath && (
          <p className={styles["error-message"]}>{errors.joinPath.message}</p>
        )}
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

export default SignupFormEmployer;
