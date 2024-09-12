"use client";

import { useEffect, useState } from "react";
import IconCheck from "@/assets/icons/icon-check-id-find.svg";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "./index.module.scss";

const maskEmail = (email: string) => {
  const [idPart, domainPart] = email.split("@");
  const maskId = idPart.length > 2 ? `${idPart.slice(0, 2)}**` : idPart;

  return `${maskId}@${domainPart}`;
};

const IdFindComplete = () => {
  const [email, setEmail] = useState<string | null>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <IconCheck />
        <h2>아이디 찾기 완료</h2>
        <p>입력하신 정보와 일치하는 아이디는 아래와 같습니다.</p>
      </header>
      <div className={styles["result-wrapper"]}>
        <p>
          {email ? (
            <p>{maskEmail(email)}</p>
          ) : (
            <p>이메일을 찾을 수 없습니다.</p>
          )}
        </p>
      </div>
      <div className={styles["button-container"]}>
        <Link href="/auth/login">
          <Button size="medium" full>
            로그인
          </Button>
        </Link>
        <Link href="/auth/pw-find">
          <Button size="medium" color="outline" full>
            비밀번호 찾기
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default IdFindComplete;
