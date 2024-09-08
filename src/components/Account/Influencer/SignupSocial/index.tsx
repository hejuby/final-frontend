"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Selectbox, { Option } from "@/components/Selectbox";
import SNSInput from "@/components/SNSInput";
import TermsCheck from "@/components/TermsCheck";
import Authentication from "@/components/Account/Authentication";
import styles from "./index.module.scss";

const SignupSocialInfluencer = () => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>
          인플루언서 회원가입{" "}
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
          label="닉네임"
          infoMessage="한글, 영문, 숫자 10자까지 (커뮤니티에서 사용할 닉네임)"
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
        <div className={styles["sns-container"]}>
          <p className={styles.title}>
            사용하실 SNS 주소{" "}
            <span className={styles["text-underline"]}>최소 1개</span>를
            입력해주세요.{" "}
            <span className={styles["text-require"]}>&#40;필수&#41;</span>
          </p>
          <SNSInput
            id="blog"
            type="NAVER_BLOG"
            placeholder="네이버 블로그"
            gap={5}
          />
          <SNSInput
            id="instagram"
            type="INSTAGRAM"
            placeholder="인스타그램"
            gap={5}
          />
          <SNSInput id="youtube" type="YOUTUBE" placeholder="유튜브" gap={5} />
          <SNSInput id="tictok" type="TIKTOK" placeholder="틱톡" gap={5} />
          <SNSInput id="etc" type="ETC" placeholder="기타" gap={5} />
        </div>
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

export default SignupSocialInfluencer;
