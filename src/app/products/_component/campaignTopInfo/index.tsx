import React from "react";
import Image from "next/image";
import { ICampaignDetails } from "@/@types/campaignItems";
import axios from "axios";
import useDialog from "@/hooks/useDialog";
import { useRouter } from "next/navigation";
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
import IconHeartRed from "@/assets/icons/icon-heart-filled.svg";
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
  isLogin,
  setCampaignData,
}: {
  campaignData: ICampaignDetails;
  isLogin: boolean;
  setCampaignData: React.Dispatch<
    React.SetStateAction<ICampaignDetails | null>
  >;
}) => {
  const { alert, confirm } = useDialog();
  const router = useRouter();
  const platformIconSrc = getIconForPlatform(campaignData.platform);

  // const [isLike, setIsLike] = useState(campaignData.isLike);

  const handleLikeBtn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isLogin) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/likes/${campaignData.id}`,
          null,
          {
            withCredentials: true,
          },
        );

        setCampaignData((prevData) => {
          if (!prevData) return null;
          return { ...prevData, isLike: !prevData.isLike };
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.msg);
        }
      }
    } else {
      const confirmLogin = await confirm(
        "로그인이 필요한 서비스입니다.",
        "로그인 하시겠습니까?",
      );
      if (confirmLogin) {
        router.push("/auth/login");
      }
    }
  };
  return (
    <div>
      <h2>
        [{campaignData.city}/{campaignData.district}]{campaignData.businessName}
        <button aria-label="like" type="button" onClick={handleLikeBtn}>
          {campaignData.isLike ? <IconHeartRed /> : <IconHeartGray />}
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
