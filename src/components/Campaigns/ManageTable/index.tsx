"use client";

import { useState } from "react";
import Link from "next/link";
import useDialog from "@/hooks/useDialog";
import { CampaignAttendee, CampaignState } from "@/@types/myCampaignItems";
import Table from "@/components/Table";
import Button from "@/components/Button";
import ToggleSwitch from "@/components/ToggleSwitch";
import IconLink from "@/assets/icons/icon-link.svg";
import IconMessage from "@/assets/icons/icon-message.svg";
import styles from "./index.module.scss";

const TABLE: Record<CampaignState, { HEAD: string[]; ORDER: string[] }> = {
  RECRUITING: {
    HEAD: [
      "번호",
      "이름",
      "선정",
      "플랫폼 등급",
      "플랫폼",
      "방문수/팔로워",
      "취소 횟수",
      "신청한마디",
    ],
    ORDER: [
      "index",
      "name",
      "selection",
      "platformRank",
      "platform",
      "views",
      "cancelledApplicationCount",
      "message",
    ],
  },
  RECRUITMENT_COMPLETED: {
    HEAD: [
      "번호",
      "이름",
      "플랫폼 등급",
      "플랫폼",
      "방문수/팔로워",
      "연락처",
      "신청한마디",
      "리뷰 등록일",
      "리뷰 URL",
      "첨부 자료",
    ],
    ORDER: [
      "index",
      "name",
      "platformRank",
      "platform",
      "views",
      "phone",
      "message",
      "reviewDate",
      "reviewUrl",
      "attachment",
    ],
  },
  EXPERIENCE_AND_REVIEW: {
    HEAD: [
      "번호",
      "이름",
      "플랫폼 등급",
      "플랫폼",
      "방문수/팔로워",
      "연락처",
      "신청한마디",
      "리뷰 등록일",
      "리뷰 URL",
      "첨부 자료",
    ],
    ORDER: [
      "index",
      "name",
      "platformRank",
      "platform",
      "views",
      "phone",
      "message",
      "reviewDate",
      "reviewUrl",
      "attachment",
    ],
  },
  REVIEW_CLOSED: {
    HEAD: [
      "번호",
      "이름",
      "플랫폼 등급",
      "플랫폼",
      "방문수/팔로워",
      "연락처",
      "신청한마디",
      "리뷰 등록일",
      "리뷰 URL",
      "첨부 자료",
    ],
    ORDER: [
      "index",
      "name",
      "platformRank",
      "platform",
      "views",
      "phone",
      "message",
      "reviewDate",
      "reviewUrl",
      "attachment",
    ],
  },
  INSPECTION: {
    HEAD: [],
    ORDER: [],
  },
};

interface ManageTableProps {
  attendees: CampaignAttendee[];
  campaignState: CampaignState;
}

const ManageTable = ({ attendees, campaignState }: ManageTableProps) => {
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const { alert } = useDialog();

  return (
    <>
      <aside className={styles.top}>
        <label htmlFor="selected-campaigns" className={styles.top__control}>
          {campaignState === "RECRUITING" && (
            <>
              <ToggleSwitch
                onChange={() => {
                  setIsOrdered((prev) => !prev);
                }}
                id="selected-campaigns"
              />
              <p>선정된 체험단 우선 정렬</p>
            </>
          )}
        </label>
        <p
          className={styles.top__selected}
        >{`모집인원 ${attendees.filter((item) => item.isChoice).length}/${attendees.length}`}</p>
      </aside>
      <Table
        head={TABLE[campaignState].HEAD}
        body={(isOrdered
          ? attendees.sort((a, b) => {
              if (a.isChoice && !b.isChoice) {
                return -1;
              }
              if (!a.isChoice && b.isChoice) {
                return 1;
              }
              return 0;
            })
          : attendees
        ).map((item, index) => {
          return {
            ...item,
            platformRank: "초급",
            views: 250,
            index: index + 1,
            attachment: "없음",
            reviewDate: item.reviewDate ?? "-",
            reviewUrl: item.reviewUrl ?? "-",
            // eslint-disable-next-line no-extra-boolean-cast
            selection: item.isChoice ? (
              <Button color="outline" padding="20px" disabled>
                <p className={styles["selection-button-text"]}>취소하기</p>
              </Button>
            ) : (
              <Button color="outline" padding="20px">
                <p className={styles["selection-button-text"]}>선정하기</p>
              </Button>
            ),
            platform: (
              <Link href="/">
                <IconLink />
              </Link>
            ),
            message: (
              <button type="button" aria-label="신청한마디 버튼">
                <IconMessage
                  onClick={async () => {
                    await alert(item.message);
                  }}
                />
              </button>
            ),
            isActive: item.isChoice,
          };
        })}
        order={TABLE[campaignState].ORDER}
      />
    </>
  );
};

export default ManageTable;
