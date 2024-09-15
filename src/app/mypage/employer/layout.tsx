"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProfileBoxEmployer from "@/components/Mypage/Employer/ProfileBox";
import InteractionListEmployer from "@/components/Mypage/Employer/InteractionList";
import Loading from "@/app/Loading";
import styles from "./layout.module.scss";

interface ProfileData {
  nickname: string;
  profileImage: string;
}

const MypageLayoutEmployer = ({ children }: { children: React.ReactNode }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/enterpriser`,
          {
            withCredentials: true,
          },
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("프로필 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchProfileData();
  }, []);
  if (!profileData) return <Loading />;

  return (
    <div className={styles.layout}>
      <h2 className="visually-hidden">마이페이지</h2>
      <div className={styles.layout__left}>
        <ProfileBoxEmployer
          nickname={profileData.nickname}
          profileImage={profileData.profileImage}
        />
        <InteractionListEmployer />
      </div>
      <div className={styles.layout__right}>{children}</div>
    </div>
  );
};

export default MypageLayoutEmployer;
