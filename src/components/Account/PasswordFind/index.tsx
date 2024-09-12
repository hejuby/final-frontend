"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useDialog from "@/hooks/useDialog";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "./index.module.scss";
import Authentication from "../Authentication";

const initialState = {
  email: "",
  name: "",
};

const PasswordFind = () => {
  const router = useRouter();
  const { alert } = useDialog();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    defaultValues: initialState,
  });

  const [impUid, setImpUid] = useState("");
  const [name, setName] = useState("");
  const [certified, setCertified] = useState<boolean>(false);

  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    if (!certified) {
      await alert("통합인증을 완료해주세요.");
      return;
    }

    const requestBody = {
      email: formData.email,
      name: formData.name,
      impId: impUid,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/password/change/check`,
        requestBody,
      );

      if (response.status === 200) {
        localStorage.setItem("name", formData.name);

        router.push(`/auth/pw-change`);
      } else {
        await alert(response.data.message || "비밀번호 찾기에 실패했습니다.");
      }
    } catch (error) {
      await alert("비밀번호 찾기에 실패했습니다.");
    }
  };

  const onError = async (formErrors: any) => {
    if (formErrors.email) {
      await alert("이메일을 확인해 주세요.");
    }
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>비밀번호 찾기</h2>
        <p>가입 시 등록한 이메일을 입력하고 간편인증을 이용해주세요.</p>
      </header>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
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
          error={errors.email?.message}
        />
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
        <div className={styles["button-container"]}>
          <Button size="medium" full type="submit">
            다음
          </Button>
          <Link href="/auth/id-find">
            <Button size="medium" color="outline" full>
              아이디 찾기
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default PasswordFind;
