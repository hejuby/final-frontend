"use client";

import React from "react";
import Link from "next/link";
import useDialog from "@/hooks/useDialog";
import styles from "./index.module.scss";

interface IBannerProps {
  img: string;
  title: string;
  desc: string;
  href: string;
}
const Banner: React.FC<IBannerProps> = ({ title, desc, href, img }) => {
  const { alert } = useDialog();

  // 임시 알러트
  const handleTempClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    alert("서비스 준비중입니다.");
  };
  return (
    <Link
      href={href}
      onClick={handleTempClick}
      style={{ backgroundImage: `url(${img})` }}
      className={styles["top-banner"]}
    >
      <h2 className={styles["main-title"]}>
        다인리뷰
        <br />
        {title}
      </h2>
      <p>{desc}</p>
      <button type="button">바로가기</button>
    </Link>
  );
};

export default Banner;
