"use client";

import React, { useEffect, useState } from "react";
import Selectbox, { Option } from "@/components/Selectbox/index";
import CampaignItemInfluencer from "@/components/Mypage/Influencer/CampaignItem";
import { CampaignItem } from "@/@types/myCampaignItems";
import axios from "axios";
import CountBox from "@/components/Mypage/Influencer/CountBox";
import Searchbox from "@/components/Mypage/Searchbox";
import CampaignEmpty from "@/components/Mypage/CampaignEmpty";
import Loading from "@/app/Loading";
import styles from "./page.module.scss";

interface ProfileData {
  appliedCampaignCount: number;
  selectedCampaignCount: number;
  ongoingCampaignCount: number;
  cancelledApplicationCount: number;
}

const MypageInfluencerPage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [isTablet, setIsTablet] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [campaignItems, setCampaignItems] = useState<CampaignItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const fetchCampaignData = async () => {
      try {
        const response = await axios.get("/api/test");
        const campaignData = response.data.content.map(
          (item: CampaignItem) => ({
            id: item.id,
            businessName: item.businessName,
            imageUrl: item.imageUrl,
            serviceProvided: item.serviceProvided,
            currentApplicants: item.currentApplicants,
            capacity: item.capacity,
            campaignState: item.campaignState,
            pointPerPerson: item.pointPerPerson,
            city: item.city,
            district: item.district,
            type: item.type,
            label: item.label,
            platform: item.platform,
            experienceStartDate: item.experienceStartDate,
            experienceEndDate: item.experienceEndDate,
            applicationDeadline: item.applicationDeadline,
            isLike: item.isLike,
            isCancellable: item.isCancellable,
          }),
        );
        setCampaignItems(campaignData);
      } catch (error) {
        console.error("체험단 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
    fetchCampaignData();
  }, []);

  if (isLoading || !profileData) return <Loading />;

  return (
    <div className={styles.container}>
      <section>
        <CountBox
          countItems={[
            { title: "신청한 체험단", count: profileData.appliedCampaignCount },
            {
              title: "선정된 체험단",
              count: profileData.selectedCampaignCount,
            },
            { title: "진행중 체험단", count: profileData.ongoingCampaignCount },
            {
              title: "취소 횟수",
              count: profileData.cancelledApplicationCount,
            },
          ]}
        />
      </section>
      {isTablet && <div className={styles.divider} />}
      <section>
        <h3 className={styles["sub-title"]}>체험단</h3>
        <div className={styles["campaign-search"]}>
          <div className={styles.search__select}>
            <Selectbox
              placeholder="플랫폼"
              size="medium"
              selected={selectedPlatform}
              options={[
                { optionLabel: "인스타", value: "instagram" },
                { optionLabel: "블로그", value: "blog" },
                { optionLabel: "틱톡", value: "tictock" },
                { optionLabel: "유튜브", value: "youtube" },
                { optionLabel: "기타", value: "etc" },
              ]}
              onChange={setSelectedPlatform}
            />
            <Selectbox
              placeholder="상태"
              size="medium"
              selected={selectedState}
              options={[
                { optionLabel: "모집중", value: "recruitment" },
                { optionLabel: "모집완료", value: "complete" },
                { optionLabel: "체험&리뷰", value: "review" },
                { optionLabel: "리뷰마감", value: "deadline" },
              ]}
              onChange={setSelectedState}
            />
          </div>
          <Searchbox />
        </div>
        <div className={styles.campaign__list}>
          {campaignItems.length > 0 ? (
            <CampaignItemInfluencer campaignItems={campaignItems} />
          ) : (
            <CampaignEmpty />
          )}
        </div>
      </section>
    </div>
  );
};

export default MypageInfluencerPage;
