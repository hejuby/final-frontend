"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import useDialog from "@/hooks/useDialog";
import useHeaderStore from "@/store/useHeaderStore";
import titles from "@/data/header_title.json";
import Logo from "@/assets/icons/logo.svg";
import MobileLogo from "@/assets/icons/logo-mobile.svg";
import IconSearch from "@/assets/icons/icon-search.svg";
import IconHamberger from "@/assets/icons/icon-hamburger.svg";
import IconClose from "@/assets/icons/icon-close.svg";
import IconLeft from "@/assets/icons/icon-direction-left.svg";
import Link from "next/link";
import styles from "./index.module.scss";
import UserInfo from "./UserInfo";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { alert } = useDialog();
  const router = useRouter();
  const pathname = usePathname();
  const setTitle = useHeaderStore((state) => state.setTitle);
  const title = useHeaderStore((state) => state.title);

  const [isTablet, setIsTablet] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // 로그인 유무
  const { isLogin, setIsLogin } = useUserStore((state) => ({
    isLogin: state.isLogin,
    setIsLogin: state.setIsLogin,
  }));

  // 유저 정보
  const { name, profileImageUrl, isInfluencer } = useUserStore((state) => ({
    name: state.name,
    profileImageUrl: state.profileImageUrl,
    isInfluencer: state.isInfluencer,
  }));

  const userInfo = {
    userName: name,
    profileImg: profileImageUrl,
    checkInfluencer: isInfluencer,
  };

  const toggleMenu = () => setShowMenu((prev) => !prev);

  // 화면 사이즈 업데이트
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

  // 타이틀설정
  useEffect(() => {
    setTitle(titles[pathname as keyof typeof titles] || "다인 리뷰");
  }, [pathname, setTitle]);

  const isAuthPage = pathname.startsWith("/auth");
  const isHomePage = pathname === "/";

  let content;

  if (isAuthPage) {
    content = <MobileLogo />;
  } else if (isHomePage) {
    content = null;
  } else {
    content = <p>{title}</p>;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          {!isTablet ? (
            <>
              <div className={styles["header__content--left"]}>
                <Link href="/">
                  <Logo />
                </Link>
                <Link href="/search">체험단</Link>
                <Link href="/" onClick={() => alert("서비스 준비중입니다.")}>
                  이용안내
                </Link>
                <Link href="/announcement">게시판</Link>
              </div>
              <div className={styles["header__content--right"]}>
                <UserInfo
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                  userInfo={userInfo}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles["header__mobile-left"]}>
                {!isHomePage ? (
                  <button
                    onClick={() => router.back()}
                    type="button"
                    aria-label="left-icon"
                  >
                    <IconLeft />
                  </button>
                ) : (
                  <Link href="/">
                    <MobileLogo />
                  </Link>
                )}
              </div>
              <p style={{ marginLeft: 20 }}>{content}</p>
              <ul className={styles["header__mobile-right"]}>
                <li>
                  <Link href="/search">
                    <IconSearch />
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    aria-label="hamberger-button"
                    onClick={toggleMenu}
                  >
                    {showMenu ? <IconClose /> : <IconHamberger />}
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </header>
      {isTablet && showMenu && (
        <MobileMenu
          setShowMenu={setShowMenu}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          userInfo={userInfo}
        />
      )}
    </>
  );
};

export default Header;
