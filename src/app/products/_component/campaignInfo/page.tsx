import React from "react";
import { ICampaignDetails } from "@/@types/campaignItems";
import formatDate from "@/utils/formatDate";
import IconWarning from "@/assets/icons/icon-warning-gray-filled.svg";
import styles from "../../page.module.scss";

interface CampaignInfoProps {
  campaignData: ICampaignDetails;
  isTablet: boolean;
}

const CampaignInfo = ({ campaignData, isTablet }: CampaignInfoProps) => {
  return (
    <div className={styles["product-info-wrap"]}>
      <div className={styles["product-info"]}>
        <div
          className={styles["product-info__img"]}
          style={{ backgroundImage: `url(${campaignData.imageUrl})` }}
        >{` `}</div>
        {isTablet && (
          <div className={styles["product-info__update"]}>
            {/* todo 경민: 잔여일 데이터 필요 */}
            <h3>
              모집기간이 <span>9일</span> 남았어요!
            </h3>
            <p>
              <span>지원 {campaignData.currentApplicants} </span> /{" "}
              {campaignData.capacity}명
            </p>
          </div>
        )}
        <div className={styles["product-info__text"]}>
          <h4>프로젝트 일정</h4>
          <ul>
            <li>
              <p className={styles["sub-title"]}>모집기간</p>
              <p>
                {formatDate(campaignData.applicationStartDate, "AbbrYMD")} ~{" "}
                {` `}
                {formatDate(campaignData.applicationEndDate, "AbbrYMD")}
              </p>
            </li>
            <li>
              <p className={styles["sub-title"]}>신청자 발표</p>
              <p>{formatDate(campaignData.announcementDate, "AbbrYMD")}</p>
            </li>
            <li>
              <p className={styles["sub-title"]}>리뷰&체험</p>
              <p>
                {formatDate(campaignData.experienceStartDate, "AbbrYMD")} ~{" "}
                {formatDate(campaignData.experienceEndDate, "AbbrYMD")}
              </p>
            </li>
            <li>
              <p className={styles["sub-title"]}>리뷰 마감</p>
              <p>{formatDate(campaignData.reviewDate, "AbbrYMD")}</p>
            </li>
          </ul>
          <div className={styles.reward}>
            <h4>제공내역</h4>
            <p>{campaignData.serviceProvided}</p>
          </div>
        </div>
      </div>
      {/* 캠페인 주의사항 */}
      <div className={styles["product-notice"]}>
        <span>
          <IconWarning color="#6f717b" width={18} />
        </span>
        {campaignData.type === "방문형" && (
          <p>
            방문&체험 후 {campaignData.platform} 콘텐츠를 올리는 체험단입니다.
          </p>
        )}
        {campaignData.type === "구매형" && (
          <p>구매 후 {campaignData.platform} 콘텐츠를 올리는 체험단입니다.</p>
        )}
        {campaignData.type === "배송형" && (
          <p>
            제품 수령 후 {campaignData.platform} 콘텐츠를 올리는 체험단입니다.
          </p>
        )}
        {campaignData.type === "기자단" && (
          <p>
            광고를 받아 {campaignData.platform} 콘텐츠를 올리는 체험단입니다.
          </p>
        )}
        {campaignData.type === "포장" && (
          <p>포장 후 {campaignData.platform} 콘텐츠를 올리는 체험단입니다.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignInfo;
