"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileImgUpload from "@/components/ProfileImgUpload";
import SNSList from "@/components/SNSList";
import Button from "@/components/Button";
import IconDirection from "@/assets/icons/icon-direction-right.svg";
import styles from "./index.module.scss";

const ProfileBox = () => {
  const [profileImg, setProfileImg] = useState(
    "/images/profile-default-mypage.svg",
  );

  const [isTablet, setIsTablet] = useState(false);

  const snsResponseList = [
    {
      snsType: "INSTAGRAM",
    },
    {
      snsType: "NAVER_BLOG",
    },
    {
      snsType: "YOUTUBE",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles["profile-container"]}>
      <h3 className="visually-hidden">나의 프로필</h3>
      <div className={styles.profile__img}>
        <ProfileImgUpload
          profileImg={profileImg}
          setProfileImg={setProfileImg}
          cameraButon
        />
      </div>
      <div className={styles["name-container"]}>
        <strong>감자도리</strong>
        {isTablet && (
          <Link href="/">
            <IconDirection />
          </Link>
        )}
      </div>
      <span className={styles.type}>인플루언서</span>
      <SNSList snsResponseList={snsResponseList} />
      <div className={styles["button-container"]}>
        <Button type="button" size="large" full>
          회원 정보 변경
        </Button>
        <Button type="button" color="outline--gray" size="large" full>
          로그아웃
        </Button>
      </div>
    </section>
  );
};

export default ProfileBox;
