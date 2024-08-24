"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/assets/icons/logo.svg";
import MobileLogo from "@/assets/icons/logo-mobile.svg";
import Link from "next/link";
import styles from "./index.module.scss";

const Footer = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const screenWidth = () => {
      if (window.innerWidth <= 1024) {
        setIsTablet(true);
      } else {
        setIsTablet(false);
      }
    };
    screenWidth();

    window.addEventListener("resize", screenWidth);
    return () => window.removeEventListener("resize", screenWidth);
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        <h3>{!isTablet ? <Logo /> : <MobileLogo />}</h3>
        <div>
          <ul className={`${styles.footer__info}`}>
            <li>(주)다인기획</li>
            <li>대표자: 김광욱</li>
          </ul>
          <ul className={`${styles.footer__info} ${styles.column}`}>
            <li>사업자등록번호: 695-87-02923</li>
            <li>통신판매업신고번호: 제2024-인천연수구-1408호</li>
          </ul>
          <ul className={`${styles.footer__info} ${styles.column}`}>
            <li>주소: 인천광역시 연수구 센트럴로 313</li>
            <li>메일: daingiplan2023@gmail.com</li>
          </ul>
          <p>전화: 010-3507-2290</p>
        </div>
        <div>
          <ul className={`${styles.footer__info} ${styles.terms}`}>
            <li>
              <Link href="./">이용약관</Link>
            </li>
            <li>
              <Link href="./">개인정보처리방침</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
