"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProfileBoxInfluencer from "@/components/Mypage/Influencer/ProfileBox";
import InteractionListInfluencer from "@/components/Mypage/Influencer/InteractionList";
import Loading from "@/app/Loading";
import { SNSResponse } from "@/components/SNSList";
import styles from "./layout.module.scss";

interface ProfileData {
  nickname: string;
  profileImage: string;
  snsResponseList: SNSResponse[];
}

const MypageLayoutInfluencer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/influencer`,
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
        <ProfileBoxInfluencer
          nickname={profileData.nickname}
          profileImage={profileData.profileImage}
          snsResponseList={profileData.snsResponseList}
        />
        <InteractionListInfluencer />
      </div>
      <div className={styles.layout__right}>{children}</div>
    </div>
  );
};

export default MypageLayoutInfluencer;
