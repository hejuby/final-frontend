"use client";

import React from "react";
import IconKakaoBlue from "@/assets/icons/icon-kakao-blue.svg";
import Link from "next/link";
import styles from "./index.module.scss";

const FloatingKakaoButton = () => {
  return (
    <Link
      href="https://pf.kakao.com/_ZGyxls" // Todo 경민: 추후 제공된 링크로 변경 예정
      className={styles["floating-button"]}
    >
      <IconKakaoBlue className={styles["floating-button__icon"]} />
    </Link>
  );
};

export default FloatingKakaoButton;
