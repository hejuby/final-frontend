"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/assets/icons/logo.svg";
import MobileLogo from "@/assets/icons/logo-mobile.svg";
import IconSearch from "@/assets/icons/icon-search.svg";
import IconHamberger from "@/assets/icons/icon-hamburger.svg";
import Link from "next/link";
import styles from "./index.module.scss";
import UserInfo from "./UserInfo";

const Header = () => {
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
    <header className={styles.header}>
      <div className={styles.header__content}>
        {!isTablet ? (
          <>
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
          </>
        ) : (
          <>
            <div className={styles["header__mobile-left"]}>
              <MobileLogo />
            </div>
            <ul className={styles["header__mobile-right"]}>
              <li>
                <Link href="/">
                  <IconSearch />
                </Link>
              </li>
              <li>
                <button type="button" aria-label="hamberger-button">
                  <IconHamberger />
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
