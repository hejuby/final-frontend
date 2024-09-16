import React from "react";
import Image from "next/image";
import { ICampaignDetails } from "@/@types/campaignItems";
import setComma from "@/utils/numberUtils";
import Tag from "@/components/Tag";
import IconInsta from "@/assets/icons/icon-sns-instagram.svg?url";
import IconBlog from "@/assets/icons/icon-sns-blog.svg?url";
import IconYoutube from "@/assets/icons/icon-sns-youtube.svg?url";
import IconTicTock from "@/assets/icons/icon-sns-tictok.svg?url";
import IconReels from "@/assets/icons/icon-sns-reels.svg?url";
import IconShorts from "@/assets/icons/icon-sns-shorts.svg?url";
import IconEtc from "@/assets/icons/icon-sns-etc.svg?url";
import IconPointCoin from "@/assets/icons/icon-point-coin.svg";
import IconHeartGray from "@/assets/icons/icon-heart-gray.svg";
import styles from "../../[productsId]/page.module.scss";

// 플랫폼 아이콘
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

const CampaignTopInfo = ({
  campaignData,
}: {
  campaignData: ICampaignDetails;
}) => {
  const platformIconSrc = getIconForPlatform(campaignData.platform);

  return (
    <div>
      {" "}
      <h2>
        {/* todo 경민 지역 누락 */} [지역1/지역2]
        {campaignData.businessName}
        <button aria-label="like" type="button">
          <IconHeartGray />
        </button>
      </h2>
      <div className={styles["product-summary"]}>
        <span>
          <Image
            src={platformIconSrc}
            alt="Platform Icon"
            width={20}
            height={20}
            style={{ marginTop: 5 }}
          />
        </span>
        <span>{campaignData.platform}</span>
        <span>
          <Tag>{campaignData.type}</Tag>
        </span>
        <span>
          <Tag color="light-gray">{campaignData.category}</Tag>
        </span>
        {campaignData.pointPerPerson > 0 && (
          <p className={styles["point-info"]}>
            {setComma(Number(campaignData.pointPerPerson))}
            <span>
              <IconPointCoin />
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CampaignTopInfo;
