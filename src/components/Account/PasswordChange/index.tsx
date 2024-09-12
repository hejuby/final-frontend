"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useDialog from "@/hooks/useDialog";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const initialState = {
  password: "",
  passwordConfirm: "",
};

const PasswordChange = () => {
  const { alert } = useDialog();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    defaultValues: initialState,
  });

  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    const requestBody = {
      password: formData.password,
    };

    console.log("폼 제출:", requestBody);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/password/change`,
        requestBody,
      );

      if (response.status === 200) {
        //
      } else {
        await alert(response.data.message || "비밀번호 변경을 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변 오류:", error);
      await alert("비밀번호 변경을 실패했습니다.");
    }
  };

  const onError = async (formErrors: any) => {
    if (formErrors.password) {
      await alert("비밀번호를 확인해 주세요.");
    }
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>비밀번호 변경하기</h2>
        <p>새로운 비밀번호를 입력해주세요.</p>
      </header>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          {" "}
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
            label="비밀번호 확인"
            type="password"
            maxLength={50}
            full
            infoMessage="8자 이상의 영문, 숫자, 특수문자 중 2가지 이상 사용"
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
        <div className={styles["button-container"]}>
          <Button size="medium" full type="submit">
            확인
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PasswordChange;
