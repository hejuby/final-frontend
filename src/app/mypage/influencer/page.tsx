"use client";

import React, { useState } from "react";
import Selectbox, { Option } from "@/components/Selectbox/index";
import CampaignItemInfluencer from "@/components/Mypage/Influencer/CampaignItem";
import CountBox from "@/components/Mypage/Influencer/CountBox";
import ProfileBox from "@/components/Mypage/Influencer/ProfileBox";
import InteractionList from "@/components/Mypage/InteractionList";
import styles from "./page.module.scss";
import Searchbox from "@/components/Mypage/Searchbox";
import Pagination from "@/components/Pagination";
import CampaignEmpty from "@/components/Mypage/CampaignEmpty";

const campaignItems = [
  {
    id: 1,
    applicationDeadline: 11,
    name: "별이네 커피집",
    region1: "서울",
    region2: "강서구",
    reward: "1만 5천원 체험권 (2인 기준)",
    experienceStartDate: "2024-09-01",
    experienceEndDate: "2024-10-01",
    campaignState: "모집중",
    platform: "",
    type: "방문형",
    applicant: 8,
    capacity: 5,
    label: "다인리뷰",
  },
  {
    id: 2,
    applicationDeadline: 11,
    name: "별이네 커피집",
    region1: "서울",
    region2: "강서구",
    reward: "1만 5천원 체험권 (2인 기준)",
    experienceStartDate: "2024-09-01",
    experienceEndDate: "2024-10-01",
    campaignState: "모집중",
    platform: "",
    type: "방문형",
    applicant: 8,
    capacity: 5,
    label: "다인리뷰",
  },
];

const MypageInfluencerPage = () => {
  const [selectedItem1, setSelectedItem1] = useState<Option | null>(null);
  const [selectedItem2, setSelectedItem2] = useState<Option | null>(null);

  return (
    <div className={styles.layout}>
      <h2 className="visually-hidden">마이페이지</h2>
      <section className={styles["layout__left"]}>
        <ProfileBox />
        <InteractionList />
      </section>
      <div className={styles["layout__right"]}>
        <section>
          <h3 className={styles["sub-title"]}>나의 활동</h3>
          <CountBox
            countItems={[
              { title: "신청한 체험단", count: 0 },
              { title: "선정된 체험단", count: 0 },
              { title: "진행중 체험단", count: 0 },
              { title: "최소 횟수", count: 0 },
            ]}
          />
        </section>
        <section>
          <h3 className={styles["sub-title"]}>체험단</h3>
          <div className={styles["search-container"]}>
            <Selectbox
              placeholder="플랫폼"
              size="medium"
              selected={selectedItem1}
              options={[
                { optionLabel: "인스타", value: "instargram" },
                { optionLabel: "블로그", value: "blog" },
                { optionLabel: "틱톡", value: "tictock" },
                { optionLabel: "유튜브", value: "youtube" },
                { optionLabel: "기타", value: "etc" },
              ]}
              onChange={setSelectedItem1}
            />
            <Selectbox
              placeholder="상태"
              size="medium"
              selected={selectedItem2}
              options={[
                { optionLabel: "모집중", value: "recruitment" },
                { optionLabel: "모집완료", value: "complete" },
                { optionLabel: "체험&리뷰", value: "review" },
                { optionLabel: "리뷰마감", value: "deadline" },
              ]}
              onChange={setSelectedItem2}
            />
            <Searchbox />
          </div>
          <CampaignItemInfluencer campaignItems={campaignItems} />

          <CampaignEmpty />
        </section>
      </div>
    </div>
  );
};

export default MypageInfluencerPage;
