"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Line from "@/components/Line";
import useDialog from "@/hooks/useDialog";
import { ICampaignDetails } from "@/@types/campaignItems";
import IconRight from "@/assets/icons/icon-direction-right-gray.svg";

import testImg from "../../../public/images/thumb-bg1.jpg";
import CampaignTopInfo from "./_component/campaignTopInfo/page";
import CampaignInfo from "./_component/campaignInfo/page";
import CampaignNotice from "./_component/campaignNotice/page";
import Customcalendar from "./_component/calendar";
import styles from "./page.module.scss";

interface DeatailComponentProps {
  campaignData: ICampaignDetails;
}

const Page = ({ campaignData }: DeatailComponentProps) => {
  const { alert } = useDialog();
  const [isTablet, setIsTablet] = useState(false);
  // 임시 데이터
  // const applicationStartDate = new Date("2024-08-25T10:00:00");
  // const applicationEndDate = new Date("2024-08-30T18:00:00");
  // const announcementDate = new Date("2024-08-31T10:00:00");
  // const experienceStartDate = new Date("2024-09-14T10:00:00");
  // const experienceEndDate = new Date("2024-09-21T18:00:00");
  // const reviewDate = new Date("2024-09-30T18:00:00");

  // 사업주 마이페이지 이동 이벤트
  const hancdleBusinessInfo = () => {
    alert("서비스 준비중입니다.");
  };

  // 화면 사이즈 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.products}>
      {/* 좌측 정보 */}
      <section className={styles.products__left}>
        <CampaignTopInfo campaignData={campaignData} />
        {/* 캠페인 정보 */}
        <CampaignInfo campaignData={campaignData} isTablet={isTablet} />
        {/* 모바일일 경우 캘린더 위치..  */}
        {isTablet && (
          <div className={styles["mobile-calendar"]}>
            <Line type="thick" />
            <div className={styles["mobile-calendar__wrap"]}>
              <Customcalendar
                applicationStartDate={campaignData.applicationStartDate}
                applicationEndDate={campaignData.applicationEndDate}
                announcementDate={campaignData.announcementDate}
                experienceStartDate={campaignData.experienceStartDate}
                experienceEndDate={campaignData.experienceEndDate}
                reviewDate={campaignData.reviewDate}
              />
            </div>
            <Line type="thick" />
          </div>
        )}
        {/* 캠페인 주의사항 */}
        <CampaignNotice campaignData={campaignData} />
        {/* todo: 경민  사업주 정보 필요 => 클릭 시 해당 회원의 마이페이지로 이동 */}
        <div className={styles["enterprise-info-wrap"]}>
          <button
            className={styles["enterprise-info"]}
            type="button"
            onClick={hancdleBusinessInfo}
          >
            <div>
              <div>
                <Image src={testImg} alt="enterpriseImage" />
              </div>
              <p>24시 감자탕</p>
            </div>
            <p>
              <IconRight />
            </p>
          </button>
        </div>
      </section>

      {/* 우측 정보 (데스크탑일 경우 캘린더 위치) */}
      {!isTablet && (
        <section className={styles.products__right}>
          <h3>
            {/* todo 경민: 잔여일 데이터 필요 */}
            모집기간이 <span>9일</span> 남았어요!
          </h3>
          <p>
            <span>지원 {campaignData.currentApplicants}명</span> /{" "}
            {campaignData.capacity}명
          </p>
          <div className={styles["calendar-wrap"]}>
            <Customcalendar
              applicationStartDate={campaignData.applicationStartDate}
              applicationEndDate={campaignData.applicationEndDate}
              announcementDate={campaignData.announcementDate}
              experienceStartDate={campaignData.experienceStartDate}
              experienceEndDate={campaignData.experienceEndDate}
              reviewDate={campaignData.reviewDate}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;
