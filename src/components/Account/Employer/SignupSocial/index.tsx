"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Selectbox, { Option } from "@/components/Selectbox";
import Authentication from "@/components/Account/Authentication";
import TermsCheck from "@/components/TermsCheck";
import styles from "./index.module.scss";

const SignupSocialEmployer = () => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>
          사업주 회원가입
          <span className={styles["text-require"]}>&#40;필수&#41;</span>
        </h2>
      </header>

      <form className={styles.form}>
        <Input
          id="email"
          type="text"
          label="이름"
          full
          infoMessage="실명으로 등록하지 않을 경우 불이익이 있을 수 있습니다."
        />
        <Authentication />
        <Input
          id="name"
          type="text"
          full
          label="업체명"
          infoMessage="문자 종류 제한 없이 50자까지 가능"
        />
        <Selectbox
          label="가입경로"
          placeholder="선택"
          selected={selectedItem}
          options={[
            { optionLabel: "포털 검색", value: "search" },
            { optionLabel: "SNS", value: "sns" },
            { optionLabel: "지인소개", value: "introduce" },
            { optionLabel: "기타", value: "etc" },
          ]}
          onChange={setSelectedItem}
        />
        <TermsCheck />
      </form>

      <div className={styles["button-container"]}>
        <Button size="medium" full>
          회원가입 하기
        </Button>
      </div>
    </section>
  );
};

export default SignupSocialEmployer;
