"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProfileImgUpload from "@/components/ProfileImgUpload";
import SNSList, { SNSResponse } from "@/components/SNSList";
import Button from "@/components/Button";
import IconDirection from "@/assets/icons/icon-direction-right.svg";
import styles from "./index.module.scss";

interface ProfileBoxInfluencerProps {
  nickname: string;
  profileImageUrl: string;
  snsResponseList: SNSResponse[];
}

const ProfileBoxInfluencer = ({
  nickname,
  profileImageUrl,
  snsResponseList,
}: ProfileBoxInfluencerProps) => {
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const defaultImg = profileImageUrl || "/images/profile-default-mypage.svg";
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageUpload = async (file: File | null) => {
    if (!file) {
      setProfileImg(null);
      alert("기본 이미지가 설정되었습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      alert("프로필 이미지가 성공적으로 업로드되었습니다.");
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다.", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className={styles["profile-container"]}>
      <h3 className="visually-hidden">나의 프로필</h3>
      <div className={styles.profile__img}>
        <ProfileImgUpload
          profileImg={profileImg}
          setProfileImg={(img) => {
            setProfileImg(img);
            if (img) {
              // @ts-ignore
              handleImageUpload(img);
            } else {
              alert("기본 이미지가 설정되었습니다.");
            }
          }}
          defaultImg={defaultImg}
          cameraButon
        />
      </div>
      <div className={styles["name-container"]}>
        <strong>{nickname}</strong>
        {isTablet && (
          <Link href="/mypage/influencer/profile">
            <IconDirection />
          </Link>
        )}
      </div>
      <span className={styles.type}>인플루언서</span>
      <SNSList snsResponseList={snsResponseList} />
      <div className={styles["button-container"]}>
        <Link href="/mypage/influencer/profile">
          <Button type="button" size="large" full>
            회원 정보 변경
          </Button>
        </Link>
        <Button type="button" color="outline--gray" size="large" full>
          로그아웃
        </Button>
      </div>
    </section>
  );
};

export default ProfileBoxInfluencer;
