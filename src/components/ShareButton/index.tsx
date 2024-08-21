"use client";

import React from "react";
import IconShare from "@/assets/icons/icon-share.svg";
import styles from "./index.module.scss";

const ShareButton = () => {
  // 클립보드로 복사
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // console.log("복사완료", text);  //Todo 경민: alert 컴포넌트 완료 후 수정 예정
    } catch (error) {
      // console.error("복사실패");
    }
  };

  const shareData = (): boolean => {
    // 현재 url 확인
    const currentUrl = window.location.href;

    // 디바이스 및 브라우저 확인
    const { userAgent } = window.navigator;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );

    if (isMobile) {
      if (navigator.share) {
        navigator.share({
          title: "다인 리뷰",
          text: "내용",
          url: currentUrl.toString(),
        });
        return true;
      }
      // alert('해당 기기는 공유기능이 지원되지 않습니다.') //Todo 경민: alert 컴포넌트 완료 후 수정 예정
      return false;
    }

    // Desktop 클립보드에 복사
    copyToClipboard(currentUrl.toString());
    return false;
  };

  const handleShare = () => {
    shareData();
  };

  return (
    <button
      type="button"
      className={styles["share-button"]}
      onClick={handleShare}
      aria-label="Share content"
    >
      <IconShare />
    </button>
  );
};

export default ShareButton;
