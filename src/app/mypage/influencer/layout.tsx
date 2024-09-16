"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import ProfileBoxInfluencer from "@/components/Mypage/Influencer/ProfileBox";
import InteractionListInfluencer from "@/components/Mypage/Influencer/InteractionList";
import Loading from "@/app/Loading";
import { SNSResponse } from "@/components/SNSList";
import styles from "./layout.module.scss";

interface ProfileData {
  nickname: string;
  profileImageUrl: string;
  snsResponseList: SNSResponse[];
}

const MypageLayoutInfluencer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const pathname = usePathname();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const isProfilePage = pathname === "/mypage/influencer/profile";

  if (!profileData) return <Loading />;

  return (
    <div className={styles.layout}>
      <h2 className="visually-hidden">마이페이지</h2>
      <div
        className={styles.layout__left}
        style={{ display: isProfilePage && isTablet ? "none" : "block" }}
      >
        <ProfileBoxInfluencer
          nickname={profileData.nickname}
          profileImageUrl={profileData.profileImageUrl}
          snsResponseList={profileData.snsResponseList}
        />
        <InteractionListInfluencer />
      </div>
      <div className={styles.layout__right}>{children}</div>
    </div>
  );
};

export default MypageLayoutInfluencer;
