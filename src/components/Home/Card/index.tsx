"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import setComma from "@/utils/numberUtils";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import ms from "@/utils/modifierSelector";
import Line from "@/components/Line";
import Tag from "@/components/Tag";
import { ICampaignItems } from "@/@types/campaignItems";
import IconHeartWhite from "@/assets/icons/icon-heart-white.svg";
import IconHeartGray from "@/assets/icons/icon-heart-gray.svg";
import IconPointCoin from "@/assets/icons/icon-point-coin.svg";
import IconPremiumBadgeLg from "@/assets/icons/icon-premium-badge-lg.svg";
import IconPremiumBadgeMd from "@/assets/icons/icon-premium-badge-md.svg";
import IconPremiumBadgeSm from "@/assets/icons/icon-premium-badge-sm.svg";
import IconDainBadgeLg from "@/assets/icons/icon-dain-badge-lg.svg";
import IconDainBadgeMd from "@/assets/icons/icon-dain-badge-md.svg";
import IconDainBadgeSm from "@/assets/icons/icon-dain-badge-sm.svg";
import IconInsta from "@/assets/icons/icon-sns-instagram.svg?url";
import IconBlog from "@/assets/icons/icon-sns-blog.svg?url";
import IconYoutube from "@/assets/icons/icon-sns-youtube.svg?url";
import IconTicTock from "@/assets/icons/icon-sns-tictok.svg?url";
import IconReels from "@/assets/icons/icon-sns-reels.svg?url";
import IconShorts from "@/assets/icons/icon-sns-shorts.svg?url";
import IconEtc from "@/assets/icons/icon-sns-etc.svg?url";

import styles from "./index.module.scss";

const cn = ms(styles, "card-wrap");

interface CardProps extends ICampaignItems {
  pattern?: "horizontal" | "vertical";
}

const getIconForPlatform = (platform: string) => {
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

const Card: React.FC<CardProps> = ({
  // id,
  businessName,
  imageUrl,
  city,
  district,
  pointPerPerson,
  experienceStartDate,
  experienceEndDate,
  currentApplicants,
  capacity,
  type,
  applicationDeadline,
  platform,
  label,
  pattern = "vertical",
}) => {
  const pathname = usePathname();

  const isSearchPage = pathname === "/search";
  const optionalClass = isSearchPage ? styles["search-page"] : "";

  const [isMobile, setIsMobile] = useState(false);

  const platformIconSrc = getIconForPlatform(platform);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${cn(`--${pattern}`)} ${optionalClass}`}>
      <div className={styles["image-content"]}>
        <Image
          src={imageUrl}
          alt="cardImage"
          width={320}
          height={320}
          loader={({ src }) => src}
        />
        {pattern === "vertical" && (
          <div className={styles["like-info"]}>
            {pointPerPerson > 0 ? (
              <p>
                {setComma(Number(pointPerPerson))}
                <span>
                  <IconPointCoin />
                </span>
              </p>
            ) : (
              <div>{` `}</div>
            )}

            <button type="button" aria-label="icon">
              <IconHeartWhite />
            </button>
          </div>
        )}
      </div>
      <div className={styles["text-content"]}>
        <div className={styles["text-content__info"]}>
          <h4>
            {applicationDeadline}일 남음
            {pattern === "horizontal" && (
              <button type="button" aria-label="icon">
                <IconHeartGray />
              </button>
            )}
          </h4>
          <h3>
            [{city}/{district}] {businessName}
          </h3>
          <p className={styles.reward}>reward</p>
          <p>
            <span>
              체험기간 : {formatDate(experienceStartDate, "AbbrYMD")} ~
              {formatDate(experienceEndDate, "AbbrYMD")}
            </span>
          </p>
        </div>
        {pattern === "vertical" && <Line />}
        <div className={styles["text-content__type"]}>
          <div>
            <Image
              src={platformIconSrc}
              alt="profileImage"
              width={isMobile ? 18 : 24}
              height={isMobile ? 18 : 24}
            />
            <Tag>{type}</Tag>
            {pattern === "horizontal" && (
              <>
                {` `}
                {pointPerPerson > 0 ? (
                  <p className={styles["point-info"]}>
                    {setComma(Number(pointPerPerson))}

                    <span>
                      <IconPointCoin />
                    </span>
                  </p>
                ) : (
                  <div>{` `}</div>
                )}
              </>
            )}
          </div>
          <p>
            신청 {currentApplicants}
            <span> / {capacity}명</span>
          </p>
        </div>
      </div>
      <div className={styles["card-badge"]}>
        {/* 라벨: 프리미엄, 다인체험단 , 일반체험단 */}
        {pattern === "vertical" && !isMobile && (
          <>
            {label === "프리미엄" && <IconPremiumBadgeLg />}
            {label === "다인체험단" && <IconDainBadgeLg />}
          </>
        )}
        {pattern === "horizontal" && !isMobile && (
          <>
            {label === "프리미엄" && <IconPremiumBadgeMd />}
            {label === "다인체험단" && <IconDainBadgeMd />}
          </>
        )}
        {pattern === "vertical" && isMobile && (
          <>
            {label === "프리미엄" && <IconPremiumBadgeMd />}
            {label === "다인체험단" && <IconDainBadgeMd />}
          </>
        )}
        {pattern === "horizontal" && isMobile && (
          <>
            {label === "프리미엄" && <IconPremiumBadgeSm />}
            {label === "다인체험단" && <IconDainBadgeSm />}
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
