"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Selectbox, { Option } from "@/components/Selectbox/index";
import CampaignItemEmployer from "@/components/Mypage/Employer/CampaignItem";
import Searchbox from "@/components/Mypage/Searchbox";
import CampaignEmpty from "@/components/Mypage/CampaignEmpty";
import Loading from "@/app/Loading";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import styles from "./page.module.scss";

const MypageEmployerPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlatform, setSelectedPlatform] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  // const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [campaignItems, setCampaignItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      size: searchParams.get("size") || 10,
    };

    try {
      const response = await axios.get(
        "/api/test",
        // `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/me`,
        {
          params,
        },
      );
      setCampaignItems(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("체험단 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignData();
  }, [searchParams]);

  const updateURL = (newParams: URLSearchParams) => {
    const newQuery = newParams.toString();
    router.replace(`?${newQuery}`);
  };

  const clearSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("keyword");
    params.delete("platform");
    params.delete("campaignState");
    updateURL(params);
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
    // setSearchKeyword(newKeyword);
    const params = new URLSearchParams(searchParams.toString());
    if (newKeyword) {
      params.set("keyword", newKeyword);
    } else {
      params.delete("keyword");
    }
    updateURL(params);
  };

  useEffect(() => {
    clearSearchParams();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
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
                  { optionLabel: "인스타", value: "INSTAGRAM" },
                  { optionLabel: "블로그", value: "BLOG" },
                  { optionLabel: "유튜브", value: "YOUTUBE" },
                  { optionLabel: "틱톡", value: "TICTOK" },
                  { optionLabel: "릴스", value: "REELS" },
                  { optionLabel: "쇼츠", value: "SHORTS" },
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
          <Link
            href="/campaigns/register"
            className={styles["campaign-button"]}
          >
            <Button>체험단 등록</Button>
          </Link>
        </div>
        <div className={styles.campaign__list}>
          {campaignItems.length > 0 ? (
            <>
              <CampaignItemEmployer campaignItems={campaignItems} />
              <Pagination
                pathname="/mypage/employer"
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

export default MypageEmployerPage;
