import React from "react";
import Image from "next/image";
import ms from "@/utils/modifierSelector";
import Line from "@/components/Line";
import IconInsta from "@/assets/icons/icon-sns-instargram.svg";
import IconHeartWhite from "@/assets/icons/icon-heart-white.svg";
import IconHeartGray from "@/assets/icons/icon-heart-gray.svg";
import IconPointCoin from "@/assets/icons/icon-point-coin.svg";
import IconBadgeLg from "@/assets/icons/icon-premium-badge-lg.svg";
import IconBadgeMd from "@/assets/icons/icon-premium-badge-md.svg";
import Tag from "@/components/Tag";
import formatDate from "@/utils/formatDate";
import styles from "./index.module.scss";

import testImg from "../../../../public/images/thumb-bg1.jpg";
const cn = ms(styles, "card-wrap");

interface ICardProps {
  type?: "horizontal" | "vertical";
  card?: {
    name: string;
    region1: string;
    region2: string;
    reward: string;
    experience_start_date: string;
    experience_end_date: string;
    point: number;
    type: string;
    applicant: number;
    capacity: number;
  };
}
const Card: React.FC<ICardProps> = ({ type = "vertical", card }) => {
  if (!card) return null;
  return (
    <div className={cn(`--${type}`)}>
      <div className={styles["image-content"]}>
        <Image src={testImg} alt="cardImage" />
        {type === "vertical" && (
          <div className={styles["like-info"]}>
            <p>
              {card.point}
              <span>
                <IconPointCoin />
              </span>
            </p>
            <button type="button">
              <IconHeartWhite />
            </button>
          </div>
        )}
      </div>
      <div className={styles["text-content"]}>
        <div className={styles["text-content__info"]}>
          <h4>
            10일 남음
            {type === "horizontal" && (
              <button>
                <IconHeartGray />
              </button>
            )}
          </h4>
          <h3>
            [{card.region1}/{card.region2}] {card.name}
          </h3>
          <p>{card.reward}</p>
          <p>
            <span>
              체험기간 : {formatDate(card.experience_start_date, "YMD")} ~
              {formatDate(card.experience_end_date, "YMD")}
            </span>
          </p>
        </div>
        {type === "vertical" && <Line />}
        <div className={styles["text-content__type"]}>
          <div>
            <IconInsta />
            <Tag>{card.type}</Tag>
            {type === "horizontal" && (
              <p className={styles["point-info"]}>
                100,000
                <span>
                  <IconPointCoin />
                </span>
              </p>
            )}
          </div>
          <p>
            신청 {card.applicant}
            <span> / {card.capacity}명</span>
          </p>
        </div>
      </div>
      <div className={styles["card-badge"]}>
        {type === "vertical" ? <IconBadgeLg /> : <IconBadgeMd />}
      </div>
    </div>
  );
};

export default Card;
