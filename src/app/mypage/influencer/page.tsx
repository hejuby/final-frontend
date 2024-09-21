"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Selectbox, { Option } from "@/components/Selectbox/index";
import CampaignItemInfluencer from "@/components/Mypage/Influencer/CampaignItem";
import { CampaignItem } from "@/@types/myCampaignItems";
import axios from "axios";
import CountBox from "@/components/Mypage/Influencer/CountBox";
import Searchbox from "@/components/Mypage/Searchbox";
import CampaignEmpty from "@/components/Mypage/CampaignEmpty";
import Loading from "@/app/Loading";
import Pagination from "@/components/Pagination";
import styles from "./page.module.scss";

interface ProfileData {
  appliedCampaignCount: number;
  selectedCampaignCount: number;
  ongoingCampaignCount: number;
  cancelledApplicationCount: number;
}

const MypageInfluencerPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlatform, setSelectedPlatform] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [isTablet, setIsTablet] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [campaignItems, setCampaignItems] = useState<CampaignItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      const platform = searchParams.get("platform") || "";
      const state = searchParams.get("campaignState") || "";
      const keyword = searchParams.get("keyword") || "";
      const page = Number(searchParams.get("page")) || 1;

      const params = {
        platform,
        campaignState: state,
        keyword,
        page,
        size: 10,
      };

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/influencer/application/me`,
          { params, withCredentials: true },
        );
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
        setTotalPages(response.data.totalPages);
        setCurrentPage(page);
      } catch (error) {
        console.error("체험단 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
    fetchCampaignData();
  }, [searchParams]);

  const updateURL = (newParams: URLSearchParams) => {
    const newQuery = newParams.toString();
    router.replace(`?${newQuery}`);
  };

  const handlePlatformChange = (selected: Option | null) => {
    setSelectedPlatform(selected);
    const params = new URLSearchParams(searchParams.toString());
    if (selected) {
      params.set("platform", String(selected.value));
    } else {
      params.delete("platform");
    }
    updateURL(params);
  };

  const handleStateChange = (selected: Option | null) => {
    setSelectedState(selected);
    const params = new URLSearchParams(searchParams.toString());
    if (selected) {
      params.set("campaignState", String(selected.value));
    } else {
      params.delete("campaignState");
    }
    updateURL(params);
  };

  const handleSearch = (newKeyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newKeyword) {
      params.set("keyword", newKeyword);
    } else {
      params.delete("keyword");
    }
    updateURL(params);
  };

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
                { optionLabel: "인스타", value: "INSTAGRAM" },
                { optionLabel: "블로그", value: "BLOG" },
                { optionLabel: "틱톡", value: "TICTOK" },
                { optionLabel: "유튜브", value: "YOUTUBE" },
                { optionLabel: "기타", value: "ETC" },
              ]}
              onChange={handlePlatformChange}
            />
            <Selectbox
              placeholder="상태"
              size="medium"
              selected={selectedState}
              options={[
                { optionLabel: "모집중", value: "RECRUITING" },
                { optionLabel: "모집완료", value: "COMPLETE" },
                { optionLabel: "체험&리뷰", value: "REVIEW" },
                { optionLabel: "리뷰마감", value: "DEADLINE" },
              ]}
              onChange={handleStateChange}
            />
          </div>
          <Searchbox onSearch={handleSearch} />
        </div>
        <div className={styles.campaign__list}>
          {campaignItems.length > 0 ? (
            <>
              <CampaignItemInfluencer campaignItems={campaignItems} />
              <Pagination
                pathname="/mypage/influencer"
                searchParams={{ page: currentPage.toString() }}
                chunkSize={10}
                totalPages={totalPages}
              />
            </>
          ) : (
            <CampaignEmpty />
          )}
        </div>
      </section>
    </div>
  );
};

export default MypageInfluencerPage;
