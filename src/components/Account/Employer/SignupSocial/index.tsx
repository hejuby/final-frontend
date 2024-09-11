"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import useDialog from "@/hooks/useDialog";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Selectbox, { Option } from "@/components/Selectbox";
import TermsCheck from "@/components/TermsCheck";
import styles from "./index.module.scss";
import Authentication from "../../Authentication";

const initialState = {
  name: "",
  nickname: "",
  joinPath: "",
  termsCheck: {
    terms: false,
    privacy: false,
    marketing: false,
  },
};

const SignupSocialEmployer = () => {
  const router = useRouter();
  const { alert } = useDialog();
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const searchParams = useSearchParams();
  const code =
    typeof window !== "undefined" ? localStorage.getItem("authCode") : "";
  const type = searchParams.get("type") || "";
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    shouldFocusError: true,
    defaultValues: initialState,
  });

  const [impUid, setImpUid] = useState("");
  const [name, setName] = useState("");
  const [certified, setCertified] = useState<boolean>(false);

  // 회원가입 제출
  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    // 통합인증 체크
    if (!certified) {
      await alert("통합인증을 완료해주세요.");
      return;
    }

    const requestBody = {
      name: formData.name,
      nickname: formData.nickname,
      joinPath: formData.joinPath,
      terms: formData.termsCheck.terms,
      personalInformation: formData.termsCheck.privacy,
      marketing: formData.termsCheck.marketing,
      impId: impUid,
      code,
      type,
    };

    console.log("폼 제출:", requestBody);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/influencer/sing-up`,
        requestBody,
      );

      if (response.status === 200) {
        localStorage.setItem("name", formData.name);
        router.push("/auth/signup-complete/influencer");
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
    if (formErrors.nickname) {
      await alert("닉네임을 확인해 주세요.");
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
        <h2>
          사업주 회원가입
          <span className={styles["text-require"]}>&#40;필수&#41;</span>
        </h2>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
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

export default SignupSocialEmployer;
