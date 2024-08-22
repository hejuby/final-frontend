"use client";

import React from "react";
import Logo from "@/assets/icons/logo.svg";
import Link from "next/link";
import styles from "./index.module.scss";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles["header__content--left"]}>
          <Link href="/">
            <Logo />
          </Link>
          <Link href="/">체험단</Link>
          <Link href="/">이용안내</Link>
          <Link href="/">게시판</Link>
        </div>
        <div className={styles["header__content--right"]}>
          <UserInfo />
        </div>
      </div>
    </header>
  );
};

export default Header;
