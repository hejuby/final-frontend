"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Line from "@/components/Line";
import useDialog from "@/hooks/useDialog";
import ShareButton from "@/components/ShareButton";
import { ICampaignDetails } from "@/@types/campaignItems";
import IconRight from "@/assets/icons/icon-direction-right-gray.svg";
import axios from "axios";
import Loading from "@/app/Loading";
import IconProfile from "@/assets/icons/icon-profile.svg?url";
import CampaignTopInfo from "../_component/campaignTopInfo";
import CampaignInfo from "../_component/campaignInfo";
import CampaignNotice from "../_component/campaignNotice";
import Customcalendar from "../_component/calendar";
import styles from "./page.module.scss";

const ProductPage = ({ params }: { params: { productsId: string } }) => {
  const { alert } = useDialog();
  const [campaignData, setCampaignData] = useState<ICampaignDetails | null>(
    null,
  );
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ICampaignDetails>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${params.productsId}`,
        );
        setCampaignData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.productsId]);

  // 화면 사이즈 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!campaignData) {
    return <Loading />;
  }

  // 사업주 마이페이지 이동 이벤트
  const handleBusinessInfo = () => {
    alert("서비스 준비중입니다.");
  };

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
        {/* todo: 경민  클릭 시 해당 회원의 마이페이지로 이동 */}
        <div className={styles["enterprise-info-wrap"]}>
          <button
            className={styles["enterprise-info"]}
            type="button"
            onClick={handleBusinessInfo}
          >
            <div>
              <div>
                <Image
                  src={campaignData.enterpriserProfileImage ?? IconProfile}
                  alt="enterpriseImage"
                />
              </div>
              <p>{campaignData.enterpriserCompanyName}</p>
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
            모집기간이 <span>{campaignData.applicationDeadline}일</span>{" "}
            남았어요!
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
          <div>
            <ShareButton />
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;
