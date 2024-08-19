"use client";

import React, { useState, useEffect } from "react";
import IconTopBtnDesk from "@/assets/icons/icon-top-button-desktop.svg";
import IconTopBtnMobile from "@/assets/icons/icon-top-button-mobile.svg";
import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

const cn = ms(styles, "top-button");

const FloatingTopButton = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  // Todo 경민: 로그인 화면에서는 버튼 안보이게 추가 설정 예정

  // 현재 screenWidth 체크
  useEffect(() => {
    const screenWidth = () => {
      if (window.innerWidth <= 390) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    screenWidth();

    window.addEventListener("resize", screenWidth);
    return () => window.removeEventListener("resize", screenWidth);
  }, []);

  // 현재 scroll 체크
  useEffect(() => {
    const handleTopBtn = () => {
      if (window.scrollY > 800) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    window.addEventListener("scroll", handleTopBtn);
    return () => window.removeEventListener("scroll", handleTopBtn);
  }, []);

  // 클릭시 최상단 이동
  const handleTopBtn = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={cn(showBtn ? "--show" : "--hide")}
      onClick={handleTopBtn}
    >
      {isMobile ? <IconTopBtnMobile /> : <IconTopBtnDesk />}
    </button>
  );
};

export default FloatingTopButton;
