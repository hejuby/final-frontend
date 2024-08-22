"use client";

import React, { useState } from "react";
import Image from "next/image";
import IconSearch from "@/assets/icons/icon-search.svg";
import IconAlram from "@/assets/icons/icon-alarm.svg";
import IconProfile from "@/assets/icons/icon-profile.svg";
import Link from "next/link";
import ms from "@/utils/modifierSelector";
import styles from "../index.module.scss";

const cn = ms(styles, "user-info");

const UserInfo: React.FC = () => {
  // 임시 로그인 상태 설정
  const [isLogin, setIsLogin] = useState(true);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleProfileClick();
    }
  };

  return (
    <div>
      {isLogin ? (
        <ul className={cn("--login")}>
          <li>
            <div
              onClick={handleProfileClick}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <div>
                {userInfo.profileImg ? (
                  <Image
                    src={userInfo.profileImg}
                    alt="profileImage"
                    width={36}
                    height={36}
                  />
                ) : (
                  <IconProfile />
                )}
              </div>
              <p>감자도리</p>
              {isModal && (
                <ul className={cn("__modal")}>
                  <li>
                    <Link href="/">마이페이지</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} type="button">
                      로그아웃
                    </button>
                  </li>
                </ul>
              )}
            </div>
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
            <Link href="/">
              <IconSearch />
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={cn("--logout")}>
          <li>
            <span>
              <Link href="/"> 로그인</Link>
            </span>
          </li>
          <li>
            <Link href="/"> 내 포인트 보러가기</Link>
          </li>
          <li>
            <Link href="/">
              <IconSearch />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserInfo;
