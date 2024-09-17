import React, { useState } from "react";
import Image from "next/image";
import Line from "@/components/Line";
import Link from "next/link";
import IconProfile from "@/assets/icons/icon-profile.svg?url";
import Home from "@/assets/icons/icon-home.svg";
import Group from "@/assets/icons/icon-experience.svg";
import Guide from "@/assets/icons/icon-guide.svg";
import Community from "@/assets/icons/icon-community.svg";
import IconDown from "@/assets/icons/icon-direction-down-gray.svg";
import IconUp from "@/assets/icons/icon-direction-up-gray.svg";
import IconRight from "@/assets/icons/icon-direction-right.svg";
import styles from "./index.module.scss";

interface MobileMenuProps {
  isLogin?: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isLogin = false,
  setShowMenu,
}) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className={styles["mobile-menu"]}>
      {/* top */}
      <div className={styles["mobile-menu__top"]}>
        {/* uerInfo */}
        {isLogin ? (
          <div className={styles["user-info--login"]}>
            <Link
              className={styles["user-profile"]}
              href="/"
              onClick={handleCloseMenu}
            >
              <div>
                <h3>
                  감자도리 <IconRight />
                </h3>
                <p>인플루언서</p>
              </div>
              <div>
                <Image
                  src={IconProfile}
                  alt="profileImage"
                  width={75}
                  height={75}
                />
              </div>
            </Link>
            <div className={styles["user-point"]}>
              <Link href="/" onClick={handleCloseMenu}>
                보유포인트 <span>0P</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles["user-info--logout"]}>
            <h3>
              안녕하세요! <br /> 다인리뷰입니다 : )
            </h3>
            <div>
              <Link
                href="/auth/login"
                className={styles["login-btn"]}
                onClick={handleCloseMenu}
              >
                로그인
              </Link>
              <Link
                href="/auth/signup"
                className={styles["join-btn"]}
                onClick={handleCloseMenu}
              >
                회원가입
              </Link>
            </div>
          </div>
        )}

        <Line type="thick" />
        {/* menu */}
        <ul className={styles["mobile-menu__list"]}>
          <li>
            <Link href="/" onClick={handleCloseMenu}>
              <Home color="#4b65f7" />
              <span>홈</span>
            </Link>
          </li>
          <li>
            <Link href="/search" onClick={handleCloseMenu}>
              <Group color="#4b65f7" />
              <span>체험단</span>
            </Link>
          </li>
          <li>
            <Link href="/" onClick={handleCloseMenu}>
              <Guide color="#4b65f7" />
              <span>이용안내</span>
            </Link>
          </li>
          <li>
            <button type="button" onClick={handleSubmenu}>
              <div>
                <Community color="#4b65f7" />
                <span>게시판</span>
              </div>
              <p>{showSubmenu ? <IconUp /> : <IconDown />}</p>
            </button>
            {showSubmenu && (
              <ul className={styles.submenu}>
                <li>
                  <Link href="/announcement" onClick={handleCloseMenu}>
                    공지사항
                  </Link>
                </li>
                <li>
                  <Link href="/communities" onClick={handleCloseMenu}>
                    커뮤니티
                  </Link>
                </li>
                <li>
                  <Link href="/follows" onClick={handleCloseMenu}>
                    맞팔/서이추
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {/* bottom */}
      {isLogin && (
        <div className={styles["mobile-menu__bottom"]}>
          <button type="button">로그아웃</button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
