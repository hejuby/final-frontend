import React from "react";
import Image from "next/image";
import ms from "@/utils/modifierSelector";
import IconInsta from "@/assets/icons/icon-sns-instagram.svg";
import IconHeartWhite from "@/assets/icons/icon-heart-white.svg";
import IconPointCoin from "@/assets/icons/icon-point-coin.svg";
import Tag from "@/components/Tag";
import formatDate from "@/utils/formatDate";
import Button from "@/components/Button";
import styles from "./index.module.scss";
// eslint-disable-next-line
import testImg from "/public/images/thumb1.jpg";

const cn = ms(styles, "campaign");

export interface CampaignItem {
  id: number;
  applicationDeadline: number;
  name: string;
  region1: string;
  region2: string;
  reward: string;
  experienceStartDate: string;
  experienceEndDate: string;
  campaignState: string;
  platform: string;
  type: string;
  applicant: number;
  capacity: number;
  label: string;
}

export interface CampaignItemProps {
  campaignItems: CampaignItem[];
}

const CampaignItemEmployer = ({ campaignItems }: CampaignItemProps) => {
  return (
    <ul className={cn("__list")}>
      {campaignItems.map((campaignItem) => (
        <li className={cn("__item")} key={campaignItem.id}>
          <div className={cn("__img-container")}>
            <div className={styles["img-wrapper"]}>
              <Image src={testImg} alt={campaignItem.name} />
              <button type="button" aria-label="좋아요">
                <IconHeartWhite />
              </button>
            </div>
          </div>
          <div className={cn("__info-container")}>
            <div className={styles["info-top"]}>
              <span className={styles.deadline}>
                {campaignItem.applicationDeadline}일 남음
              </span>
              <h3>
                [{campaignItem.region1}/{campaignItem.region2}]{" "}
                {campaignItem.name}
              </h3>
              <p className={styles.reward}>{campaignItem.reward}</p>
              <p className={styles.date}>
                체험기간 : {formatDate(campaignItem.experienceStartDate, "YMD")}{" "}
                ~ {formatDate(campaignItem.experienceEndDate, "YMD")}
              </p>
              <div className={styles.state}>
                <Tag color="outline--blue" shape="rounded">
                  {campaignItem.campaignState}
                </Tag>
              </div>
            </div>

            <div className={styles["info-bottom"]}>
              <div className={styles["text-container"]}>
                <div>
                  {campaignItem.platform}
                  <IconInsta />
                </div>
                <div className={styles.type}>
                  <Tag>{campaignItem.type}</Tag>
                </div>
                <p className={styles.point}>
                  100,000
                  <span>
                    <IconPointCoin />
                  </span>
                </p>
                <p className={styles.apply}>
                  신청 {campaignItem.applicant}
                  <span> / {campaignItem.capacity}명</span>
                </p>
              </div>
              <div className={styles["button-container"]}>
                <Button type="button" color="outline--gray">
                  취소하기
                </Button>
                <Button type="button" color="outline">
                  리뷰등록
                </Button>
              </div>
            </div>
          </div>
          <div className={`${styles["campaign-label"]}`}>
            {campaignItem.label}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CampaignItemEmployer;
