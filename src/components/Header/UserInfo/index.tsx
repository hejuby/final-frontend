"use client";

import React, { useState } from "react";

import IconSearch from "@/assets/icons/icon-search.svg";
import IconAlram from "@/assets/icons/icon-alarm.svg";

import Link from "next/link";
import ms from "@/utils/modifierSelector";
import styles from "../index.module.scss";
import UserProfile from "../UserProfile";

const cn = ms(styles, "user-info");

const UserInfo: React.FC = () => {
  // 임시 로그인 상태 설정
  const [isLogin, setIsLogin] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const userInfo = {
    userName: "감자도리",
    point: "100,250",
    profileImg: undefined,
  };

  const handleProfileClick = () => {
    setIsModal(!isModal);
  };

  const handleLogout = () => {
    setIsLogin(false);
  };

  return (
    <div>
      {!isLogin ? (
        // 로그인 전
        <ul className={cn("--logout")}>
          <li>
            <span>
              <Link href="/auth/login">로그인</Link>
            </span>
          </li>
          <li>
            <Link href="/">내 포인트 보러가기</Link>
          </li>
          <li>
            <Link href="/">
              <IconSearch />
            </Link>
          </li>
        </ul>
      ) : (
        // 로그인 후
        <>
          <ul className={cn("--login")}>
            <li>
              <button
                type="button"
                aria-label="user-profile"
                onClick={handleProfileClick}
              >
                <UserProfile userInfo={userInfo} />
              </button>
            </li>
            <li>
              <Link href="/">
                포인트 <span>100,250P</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <IconAlram />
              </Link>
            </li>
            <li>
              <Link href="/search">
                <IconSearch />
              </Link>
            </li>
          </ul>
          {isModal && (
            <ul className={cn("__modal")}>
              <li>
                <Link href="/">마이페이지</Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  로그아웃
                </button>
              </li>
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default UserInfo;
