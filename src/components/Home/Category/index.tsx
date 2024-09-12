"use client";

import React from "react";
import Link from "next/link";
import useDialog from "@/hooks/useDialog";
import styles from "./index.module.scss";

interface CategoryProps {
  icon: JSX.Element;
  label: string;
  href: string;
}

const Category: React.FC<CategoryProps> = ({ icon, label, href }) => {
  const { alert } = useDialog();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (href === "/") {
      event.preventDefault();
      alert("서비스 준비중입니다.");
    }
  };

  return (
    <Link href={href} className={styles["category-item"]} onClick={handleClick}>
      {icon} {/* 아이콘 JSX 요소로 렌더링 */}
      <p>{label}</p>
    </Link>
  );
};

export default Category;
