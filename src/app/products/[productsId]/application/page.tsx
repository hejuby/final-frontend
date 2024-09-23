"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useDialog from "@/hooks/useDialog";
import { useRouter } from "next/navigation";
import { ICampaignDetails } from "@/@types/campaignItems";
import setComma from "@/utils/numberUtils";
import formatDate from "@/utils/formatDate";
import axios from "axios";
import Tag from "@/components/Tag";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import IconInsta from "@/assets/icons/icon-sns-instagram.svg?url";
import IconBlog from "@/assets/icons/icon-sns-blog.svg?url";
import IconYoutube from "@/assets/icons/icon-sns-youtube.svg?url";
import IconTicTock from "@/assets/icons/icon-sns-tictok.svg?url";
import IconReels from "@/assets/icons/icon-sns-reels.svg?url";
import IconShorts from "@/assets/icons/icon-sns-shorts.svg?url";
import IconEtc from "@/assets/icons/icon-sns-etc.svg?url";
import IconPointCoin from "@/assets/icons/icon-point-coin.svg";
import styles from "./page.module.scss";

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

const Application = ({ params }: { params: { productsId: string } }) => {
  const { alert } = useDialog();
  const router = useRouter();

  const [campaignData, setCampaignData] = useState<ICampaignDetails | null>(
    null,
  );
  const [aplliMessage, setAppliMessage] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState(false);

  // 캠페인 데이터 호출
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<ICampaignDetails>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${params.productsId}`,
          {
            withCredentials: true,
          },
        );

        setCampaignData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.msg);
        }
      }
    };

    getData();
    // eslint-disable-next-line
  }, [params.productsId]);

  // 신청 제출 이벤트
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAgreed) {
      alert("개인정보 수집 및 이용동의에 체크해주세요.");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const messageForm = formData.get("aplliMessage") as string;

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/influencer/application`,
        {
          campaignId: params.productsId,
          message: messageForm,
        },
        {
          withCredentials: true,
        },
      )
      .then(async () => {
        await alert(
          `${campaignData?.businessName}체험단 신청이 완료되었습니다.`,
        );
        router.push(`/products/${params.productsId}`);
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.msg);
        }
      });
  };

  const platformIconSrc = campaignData?.platform
    ? getIconForPlatform(campaignData.platform)
    : "";

  return (
    <section className={styles.application}>
      <h2>체험단 신청</h2>
      <div className={styles["appli-wrap"]}>
        <div
          className={styles["appli-wrap__img"]}
          style={{ backgroundImage: `url(${campaignData?.imageUrl})` }}
        >
          {" "}
        </div>
        <div className={styles["appli-wrap__contents"]}>
          <div className={styles["title-box"]}>
            <h3>
              [{campaignData?.city}/{campaignData?.district}]{" "}
              {campaignData?.businessName}
            </h3>
            <p>{campaignData?.serviceProvided}</p>
            <div>
              <div>
                <Image
                  src={platformIconSrc}
                  alt="Platform Icon"
                  width={20}
                  height={20}
                  style={{ marginTop: 5 }}
                />
              </div>
              <p>{campaignData?.platform}</p>
              <Tag>{campaignData?.type}</Tag>
              <Tag color="light-gray">{campaignData?.category}</Tag>
              {typeof campaignData?.pointPerPerson === "number" &&
                campaignData.pointPerPerson > 0 && (
                  <p className={styles["point-info"]}>
                    {setComma(Number(campaignData.pointPerPerson))}
                    <span>
                      <IconPointCoin />
                    </span>
                  </p>
                )}
            </div>
          </div>
          <ul className={styles["contents-box"]}>
            <li>
              <h4>모집기간</h4>
              <p>
                {formatDate(campaignData?.applicationStartDate, "AbbrYMD")} ~{" "}
                {formatDate(campaignData?.applicationEndDate, "AbbrYMD")}
              </p>
            </li>
            <li>
              <h4>선정자 발표</h4>
              <p>{formatDate(campaignData?.announcementDate, "AbbrYMD")}</p>
            </li>
            <li>
              <h4>리뷰&체험</h4>
              <p>
                {formatDate(campaignData?.experienceStartDate, "AbbrYMD")} ~{" "}
                {formatDate(campaignData?.experienceEndDate, "AbbrYMD")}
              </p>
            </li>
            <li>
              <h4>리뷰마감</h4>
              <p>{formatDate(campaignData?.reviewDate, "AbbrYMD")}</p>
            </li>
            <li className={styles.bold}>
              <h4>지원현황</h4>
              <div>
                지원{campaignData?.currentApplicants} /{campaignData?.capacity}
                명
                <Tag color="light-blue">
                  {campaignData?.applicationDeadline}일 남음
                </Tag>
              </div>
            </li>
          </ul>
          <form onSubmit={handleSubmit} className={styles["appli-box"]}>
            <h3>신청한마디</h3>
            <p>신청시 광고주가 참고할 수 있는 내용이 있다면 작성해주세요.</p>
            <textarea
              name="aplliMessage"
              id="aplliMessage"
              placeholder={`내용을 입력해주세요.\n예시) 평일 오전 시간대를 선호합니다. 평소 뷰티 디바이스에 관심이 많습니다. 등...`}
              style={{ whiteSpace: "pre-wrap" }}
              value={aplliMessage}
              onChange={(e) => setAppliMessage(e.target.value)}
            />
            <div>
              <Checkbox
                type="checkbox"
                id="agree"
                onChange={(e) => setIsAgreed(e.target.checked)}
              >
                <span style={{ marginLeft: 5 }}>
                  개인정보 수집 및 이용동의 (필수)
                </span>
              </Checkbox>
            </div>
            <div className={styles["appli-button"]}>
              <Button type="submit" padding="100px" size="medium">
                신청하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Application;
