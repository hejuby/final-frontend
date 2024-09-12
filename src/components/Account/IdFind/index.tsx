"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import useDialog from "@/hooks/useDialog";
import axios from "axios";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "./index.module.scss";
import Authentication from "../Authentication";

const initialState = {
  name: "",
};

const IdFind = () => {
  const router = useRouter();
  const { alert } = useDialog();
  const { handleSubmit } = useForm({
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
      name: formData.name,
      impId: impUid,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/id/find`,
        requestBody,
      );

      if (response.status === 200) {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", formData.name);

        router.push(`/auth/id-find-complete`);
      } else {
        await alert(response.data.message || "아이디 찾기에 실패했습니다.");
      }
    } catch (error) {
      await alert("아이디 찾기에 실패했습니다.");
    }
  };

  const onError = async (formErrors: any) => {
    if (formErrors) {
      alert("필수 항목을 모두 입력해 주세요.");
    }
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>아이디 찾기</h2>
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
        <div className={styles["button-container"]}>
          <Button size="medium" full type="submit">
            확인
          </Button>
          <Link href="/auth/pw-find">
            <Button size="medium" color="outline" full>
              비밀번호 찾기
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default IdFind;
