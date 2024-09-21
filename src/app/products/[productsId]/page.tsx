"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Line from "@/components/Line";
import useDialog from "@/hooks/useDialog";
import useUserStore from "@/store/useUserStore";
import ShareButton from "@/components/ShareButton";
import { ICampaignDetails } from "@/@types/campaignItems";
import Button from "@/components/Button";
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
  const { alert, confirm } = useDialog();
  const router = useRouter();

  // 로그인 유무
  const { isLogin, isInfluencer } = useUserStore((state) => ({
    isLogin: state.isLogin,
    isInfluencer: state.isInfluencer,
  }));

  const [campaignData, setCampaignData] = useState<ICampaignDetails | null>(
    null,
  );
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ICampaignDetails>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${params.productsId}`,
          {
            withCredentials: true,
          },
        );
        const updateData = {
          ...response.data,
          isLike: isLogin ? response.data.isLike : false,
        };

        setCampaignData(updateData);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.msg);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [params.productsId, isLogin]);

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

  // 신청 페이지 이동 이벤트
  const handleAppli = async () => {
    if (!isLogin) {
      const confirmLogin = await confirm(
        "로그인이 필요한 페이지입니다.",
        "로그인 하시겠습니까?",
      );
      if (confirmLogin) {
        router.push("/auth/login");
      }
    } else {
      router.push(`/products/${campaignData.id}/application`);
    }
  };

  return (
    <>
      {" "}
      <div className={styles.products}>
        {/* 좌측 정보 */}
        <section className={styles.products__left}>
          <CampaignTopInfo
            campaignData={campaignData}
            isLogin={isLogin}
            setCampaignData={setCampaignData}
          />
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
            <div className={styles["button-wrap"]}>
              <ShareButton />
              <div>
                <Button
                  padding="30px"
                  size="large"
                  full
                  disabled={!isInfluencer}
                  onClick={handleAppli}
                >
                  신청하기
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
      {isTablet && (
        <div className={styles["mobile-btn-wrap"]}>
          <ShareButton />
          <div className={styles["alli-btn"]}>
            <Button
              padding="30px"
              size="large"
              full
              disabled={!isInfluencer}
              onClick={handleAppli}
            >
              신청하기
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
