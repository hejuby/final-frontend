"use client";

import React from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import Home from "@/assets/icons/icon-home.svg";
import Group from "@/assets/icons/icon-experience.svg";
import Guide from "@/assets/icons/icon-guide.svg";
import Community from "@/assets/icons/icon-community.svg";
import MyPage from "@/assets/icons/icon-mypage.svg";
import Link from "next/link";
import styles from "./index.module.scss";

const gnbItems = [
  { href: "/", icon: Home, label: "홈", segment: null },
  { href: "/experience", icon: Group, label: "체험단", segment: "experience" },
  { href: "/guide", icon: Guide, label: "이용안내", segment: "guide" },
  {
    href: "/communities",
    icon: Community,
    label: "게시판",
    segment: "board",
  },
  { href: "/mypage", icon: MyPage, label: "마이페이지", segment: "mypage" },
];

const MobileGnb = () => {
  const segment = useSelectedLayoutSegment();

  // 로그인&회원가입 mobile-footer 안 보이게 처리: 민주
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <ul className={styles["mobile-footer"]}>
      {gnbItems.map(({ href, icon: Icon, label, segment: segmentValue }) => (
        <li key={href}>
          <Link href={href}>
            <Icon color={segment === segmentValue ? "#4b65f7" : "#202026"} />
            <span className={segment === segmentValue ? styles.active : ""}>
              {label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MobileGnb;
