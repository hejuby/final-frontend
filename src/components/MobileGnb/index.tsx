"use client";

import React from "react";
import {
  useRouter,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation";
import useUserStore from "@/store/useUserStore";
import useDialog from "@/hooks/useDialog";
import Home from "@/assets/icons/icon-home.svg";
import Group from "@/assets/icons/icon-experience.svg";
import Guide from "@/assets/icons/icon-guide.svg";
import Community from "@/assets/icons/icon-community.svg";
import MyPage from "@/assets/icons/icon-mypage.svg";
import Link from "next/link";
import styles from "./index.module.scss";

const gnbItems = [
  { href: "/", icon: Home, label: "홈", segment: null },
  { href: "/search", icon: Group, label: "체험단", segment: "search" },
  { href: "#", icon: Guide, label: "이용안내", segment: "guide" },
  {
    href: "/announcement",
    icon: Community,
    label: "게시판",
    segment: "announcement",
  },
  { href: "/mypage", icon: MyPage, label: "마이페이지", segment: "mypage" },
];

const MobileGnb = () => {
  const { alert, confirm } = useDialog();
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  // 로그인 유무
  const { isLogin, isInfluencer } = useUserStore((state) => ({
    isLogin: state.isLogin,
    isInfluencer: state.isInfluencer,
  }));

  const handleAlert = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert("서비스 준비중입니다.");
  };

  const handleMypageClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isLogin) {
      const confirmLogin = await confirm(
        "로그인이 필요한 페이지입니다.",
        "로그인 하시겠습니까?",
      );
      if (confirmLogin) {
        router.push("/auth/login");
      }
    } else {
      const destination = isInfluencer
        ? "/mypage/influencer"
        : "/mypage/employer";
      router.push(destination);
    }
  };

  const handleClickLink = (segmentValue: string | null) => {
    if (segmentValue === "mypage") {
      return handleMypageClick;
    }
    if (segmentValue === "guide") {
      return handleAlert;
    }
    return undefined;
  };

  // 로그인&회원가입 mobile-footer 안 보이게 처리: 민주
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <ul className={styles["mobile-footer"]}>
      {gnbItems.map(({ href, icon: Icon, label, segment: segmentValue }) => (
        <li key={href}>
          <Link href={href} onClick={handleClickLink(segmentValue)}>
            <Icon
              color={
                segment === segmentValue ||
                (segmentValue === "announcement" &&
                  (pathname === "/announcement" ||
                    pathname === "/communities" ||
                    pathname === "/follows")) ||
                (segmentValue === null && pathname === "/")
                  ? "#4b65f7"
                  : "#202026"
              }
            />
            <span
              className={
                segment === segmentValue ||
                (segmentValue === "announcement" &&
                  (pathname === "/announcement" ||
                    pathname === "/communities" ||
                    pathname === "/follows")) ||
                (segmentValue === null && pathname === "/")
                  ? styles.active
                  : ""
              }
            >
              {label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MobileGnb;
