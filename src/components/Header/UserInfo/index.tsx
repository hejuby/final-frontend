"use client";

import React, { useEffect, useState, useRef } from "react";
import IconSearch from "@/assets/icons/icon-search.svg";
import { useRouter } from "next/navigation";
import IconAlram from "@/assets/icons/icon-alarm.svg";
import useDialog from "@/hooks/useDialog";
import Link from "next/link";
import ms from "@/utils/modifierSelector";
import UserProfile from "../UserProfile";
import styles from "../index.module.scss";

const cn = ms(styles, "user-info");
interface IUserInfoProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  userInfo: {
    userName: string;
    profileImg: string;
    checkInfluencer: boolean;
  };
}

const UserInfo: React.FC<IUserInfoProps> = ({
  isLogin,
  setIsLogin,
  userInfo,
}) => {
  const { alert, confirm } = useDialog();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLUListElement | null>(null);

  const [isModal, setIsModal] = useState(false);

  const handleProfileClick = () => {
    setIsModal(!isModal);
  };

  // 로그아웃 이벤트
  const handleLogout = async () => {
    const confirmLogout = await confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      sessionStorage.removeItem("login");
      setIsLogin(false);
    }
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const handleLogin = async () => {
    const confirmLogin = await confirm(
      "로그인이 필요한 서비스입니다.",
      "로그인 하시겠습니까?",
    );
    if (confirmLogin) {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div>
      {isMounted && (
        <>
          {` `}
          {!isLogin ? (
            <ul className={cn("--logout")}>
              <li>
                <span>
                  <Link href="/auth/login">로그인</Link>
                </span>
              </li>
              <li>
                <button onClick={handleLogin} type="button">
                  내 포인트 보러가기
                </button>
              </li>
              <li>
                <Link href="/">
                  <IconSearch />
                </Link>
              </li>
            </ul>
          ) : (
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
                  <Link
                    href={
                      userInfo.checkInfluencer
                        ? "/mypage/influencer"
                        : "/mypage/employer"
                    }
                  >
                    포인트 <span>0P</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => alert("서비스 준비중입니다.")}
                    type="button"
                  >
                    <IconAlram />
                  </button>
                </li>
                <li>
                  <Link href="/search">
                    <IconSearch />
                  </Link>
                </li>
              </ul>
              {isModal && (
                <ul className={cn("__modal")} ref={modalRef}>
                  <li>
                    <Link
                      href={
                        userInfo.checkInfluencer
                          ? "/mypage/influencer"
                          : "/mypage/employer"
                      }
                      onClick={closeModal}
                    >
                      마이페이지
                    </Link>
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
        </>
      )}
    </div>
  );
};

export default UserInfo;
