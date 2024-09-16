import React from "react";
import Image from "next/image";
import { CampaignItemProps } from "@/@types/myCampaignItems";
import ms from "@/utils/modifierSelector";
import setComma from "@/utils/numberUtils";
import formatDate from "@/utils/formatDate";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import IconInsta from "@/assets/icons/icon-sns-instagram.svg?url";
import IconBlog from "@/assets/icons/icon-sns-blog.svg?url";
import IconYoutube from "@/assets/icons/icon-sns-youtube.svg?url";
import IconTicTock from "@/assets/icons/icon-sns-tictok.svg?url";
import IconReels from "@/assets/icons/icon-sns-reels.svg?url";
import IconShorts from "@/assets/icons/icon-sns-shorts.svg?url";
import IconEtc from "@/assets/icons/icon-sns-etc.svg?url";
import IconHeartWhite from "@/assets/icons/icon-heart-white.svg";
import IconHeartWhiteFilled from "@/assets/icons/icon-heart-filled.svg";
import IconPointCoin from "@/assets/icons/icon-point-coin.svg";
import styles from "./index.module.scss";

const cn = ms(styles, "campaign");

// 플랫폼
const getIconPlatform = (platform: string) => {
  switch (platform) {
    case "유튜브":
      return IconYoutube;
    case "블로그":
      return IconBlog;
    case "릴스":
      return IconReels;
    case "쇼츠":
      return IconShorts;
    case "인스타그램":
      return IconInsta;
    case "틱톡":
      return IconTicTock;
    case "기타":
      return IconEtc;
    default:
      return null;
  }
};

// 상태
const getCampaignState = (state: string) => {
  switch (state) {
    case "INSPECTION":
      return "검수증";
    case "RECRUITING":
      return "모집중";
    case "RECRUITMENT_COMPLETED":
      return "모집완료";
    case "EXPERIENCE_AND_REVIEW":
      return "체험&리뷰";
    case "REVIEW_CLOSED":
      return "리뷰마감";
    default:
      return state;
  }
};

// 상태 색상
const getCampaignStateColor = (state: string) => {
  switch (state) {
    case "INSPECTION": // 검수중
      return "outline--blue";
    case "RECRUITING": // 모집중
      return "outline--blue";
    case "RECRUITMENT_COMPLETED": // 모집완료
      return "default";
    case "EXPERIENCE_AND_REVIEW": // 체험&리뷰
      return "light-purple";
    case "REVIEW_CLOSED": // 리뷰마감
      return "dark-gray";
    default:
      return "outline--blue";
  }
};

const CampaignItemEmployer = ({ campaignItems }: CampaignItemProps) => {
  return (
    <ul className={cn("__list")}>
      {campaignItems.map((campaignItem) => {
        // 플랫폼
        const platformIcon = getIconPlatform(campaignItem.platform);
        // 상태
        const campaignState = getCampaignState(campaignItem.campaignState);
        // 상태 색상
        const campaignStateColor = getCampaignStateColor(
          campaignItem.campaignState,
        );
        // 리뷰 마감 클래스 추가
        const campaignItemClass =
          campaignItem.campaignState === "REVIEW_CLOSED"
            ? `${cn("__item")} ${styles["review-closed"]}`
            : cn("__item");
        // 라벨 프리미엄 클래스 추가
        const campaignLabelClass =
          campaignItem.label === "프리미엄"
            ? `${styles["campaign-label"]} ${styles.premium}`
            : styles["campaign-label"];
        // 좋아요 유무
        const likeIcon = campaignItem.isLike ? (
          <IconHeartWhiteFilled />
        ) : (
          <IconHeartWhite />
        );

        return (
          <li className={campaignItemClass} key={campaignItem.id}>
            <div className={styles["img-container"]}>
              <div className={styles["img-wrapper"]}>
                <Image
                  src={campaignItem.imageUrl}
                  alt={campaignItem.businessName}
                  fill
                  objectFit="cover"
                />
                <button
                  type="button"
                  aria-label="좋아요"
                  className={styles["like-button"]}
                >
                  {likeIcon}
                </button>
              </div>
            </div>
            <div className={styles["info-container"]}>
              <div className={styles["info-top"]}>
                <span className={styles.deadline}>
                  {campaignItem.applicationDeadline === 0
                    ? "종료"
                    : `${campaignItem.applicationDeadline}일 남음`}
                </span>
                <h3>
                  [{campaignItem.city}/{campaignItem.district}]{" "}
                  {campaignItem.businessName}
                </h3>
                <p className={styles.reward}>{campaignItem.serviceProvided}</p>
                <p className={styles.date}>
                  체험기간:{" "}
                  {`${formatDate(
                    campaignItem.experienceStartDate,
                    "AbbrYMD",
                  )} ~ ${formatDate(campaignItem.experienceEndDate, "AbbrYMD")}`}
                </p>
                <div className={styles.state}>
                  <Tag color={campaignStateColor} shape="rounded">
                    {campaignState}
                  </Tag>
                </div>
              </div>

              <div className={styles["info-bottom"]}>
                <div className={styles["text-container"]}>
                  {platformIcon && (
                    <span>
                      <Image
                        src={platformIcon}
                        alt={campaignItem.platform}
                        width={22}
                        height={22}
                        style={{ marginTop: 3 }}
                      />
                    </span>
                  )}
                  <div className={styles.type}>
                    <Tag>{campaignItem.type}</Tag>
                  </div>
                  {campaignItem.pointPerPerson > 0 && (
                    <p className={styles.point}>
                      {setComma(Number(campaignItem.pointPerPerson))}
                      <span>
                        <IconPointCoin />
                      </span>
                    </p>
                  )}
                  <p className={styles.apply}>
                    신청 {campaignItem.currentApplicants}
                    <span> / {campaignItem.capacity}명</span>
                  </p>
                </div>
                <div className={styles["button-container"]}>
                  {campaignItem.isCancellable && (
                    <Button type="button" color="outline--gray">
                      취소하기
                    </Button>
                  )}
                  <Button type="button" color="outline">
                    체험단 관리
                  </Button>
                </div>
              </div>
            </div>
            {campaignItem.label && (
              <div className={campaignLabelClass}>{campaignItem.label}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CampaignItemEmployer;
