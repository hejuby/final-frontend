"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import IconWelcome from "@/assets/icons/icon-welcome.svg";
import styles from "./index.module.scss";

const SignupCompleteInfluencer = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>
          만나서 반가워요.
          <br />
          <span>{name}</span>님
        </h2>
        <p>
          원활한 체험 활동을 위해
          <br /> 먼저 프로필 등록부터 해볼까요~?
        </p>
        <IconWelcome />
      </header>
      <div className={styles["button-container"]}>
        <Link href="/auth/profile/influencer">
          <Button size="medium" full>
            네, 등록할래요.
          </Button>
        </Link>
      </div>

      <p className={styles["login-text"]}>
        <Link href="/auth/login">다음에 할래요.</Link>
      </p>
    </section>
  );
};

export default SignupCompleteInfluencer;
