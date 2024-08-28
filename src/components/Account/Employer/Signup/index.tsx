"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Selectbox, { Option } from "@/components/Selectbox";
import TermsCheck from "@/components/TermsCheck";
import styles from "./index.module.scss";
import Authentication from "../../Authentication";

const SignupEmployer = () => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>사업주 회원가입</h2>
      </header>

      <form className={styles.form}>
        <div className={styles["email-check"]}>
          <Input id="email" type="email" label="이메일" full />
          <Button size="medium" color="outline">
            중복체크
          </Button>
        </div>
        <div className={styles["password-check"]}>
          <Input id="password" type="password" label="비밀번호" full gap={5} />
          <Input
            id="passwordCheck"
            type="password"
            full
            infoMessage="8자 이상의 영문, 숫자, 특수문자 중 2가지이상"
          />
        </div>
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

export default SignupEmployer;
