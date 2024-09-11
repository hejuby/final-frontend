"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ms from "@/utils/modifierSelector";
import Line from "@/components/Line";
import IconInsta from "@/assets/icons/icon-sns-instagram.svg?url";
import IconHeartWhite from "@/assets/icons/icon-heart-white.svg";
import IconHeartGray from "@/assets/icons/icon-heart-gray.svg";
import IconPointCoin from "@/assets/icons/icon-point-coin.svg";
import IconBadgeLg from "@/assets/icons/icon-premium-badge-lg.svg";
import IconBadgeMd from "@/assets/icons/icon-premium-badge-md.svg";
import Tag from "@/components/Tag";
import formatDate from "@/utils/formatDate";
import testImg from "../../../../public/images/thumb-bg1.jpg";
import styles from "./index.module.scss";

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
  const pathname = usePathname();

  const isSearchPage = pathname === "/search";
  const optionalClass = isSearchPage ? styles["search-page"] : "";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!card) return null;
  return (
    <div className={`${cn(`--${type}`)} ${optionalClass}`}>
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
            <button type="button" aria-label="icon">
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
              <button type="button" aria-label="icon">
                <IconHeartGray />
              </button>
            )}
          </h4>
          <h3>
            [{card.region1}/{card.region2}] {card.name}
          </h3>
          <p className={styles.reward}>{card.reward}</p>
          <p>
            <span>
              체험기간 : {formatDate(card.experience_start_date, "AbbrYMD")} ~
              {formatDate(card.experience_end_date, "AbbrYMD")}
            </span>
          </p>
        </div>
        {type === "vertical" && <Line />}
        <div className={styles["text-content__type"]}>
          <div>
            {/* <IconInsta /> */}
            <Image
              src={IconInsta}
              alt="profileImage"
              width={isMobile ? 18 : 24}
              height={isMobile ? 18 : 24}
            />
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
