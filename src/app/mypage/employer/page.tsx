"use client";

import React, { useEffect, useState } from "react";
import { CampaignItem } from "@/@types/myCampaignItems";
import Selectbox, { Option } from "@/components/Selectbox/index";
import CampaignItemEmployer from "@/components/Mypage/Employer/CampaignItem";
import axios from "axios";
import Searchbox from "@/components/Mypage/Searchbox";
import CampaignEmpty from "@/components/Mypage/CampaignEmpty";
import Loading from "@/app/Loading";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "./page.module.scss";

const MypageEmployerPage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [isTablet, setIsTablet] = useState(false);
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

    fetchCampaignData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
      {isTablet && <div className={styles.divider} />}
      <section>
        <h3 className={styles["sub-title"]}>체험단 관리</h3>
        <div className={styles["campaign-search"]}>
          <div className={styles["search-inner"]}>
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
          <Link
            href="/campaigns/register"
            className={styles["campaign-button"]}
          >
            <Button>체험단 등록</Button>
          </Link>
        </div>
        <div className={styles.campaign__list}>
          {campaignItems.length > 0 ? (
            <CampaignItemEmployer campaignItems={campaignItems} />
          ) : (
            <CampaignEmpty />
          )}
        </div>
      </section>
    </div>
  );
};

export default MypageEmployerPage;
