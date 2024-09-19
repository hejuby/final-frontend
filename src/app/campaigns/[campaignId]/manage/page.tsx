"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  CampaignManageResponse,
  CampaignState,
} from "@/@types/myCampaignItems";
import ManageProgress from "@/components/Campaigns/ManageProgress";
import ManageTable from "@/components/Campaigns/ManageTable";
import ManageButtons from "@/components/Campaigns/ManageButtons";
import Line from "@/components/Line";
import styles from "./page.module.scss";

const CAMPAIGN_STATES: CampaignState[] = [
  "RECRUITING",
  "RECRUITMENT_COMPLETED",
  "EXPERIENCE_AND_REVIEW",
  "REVIEW_CLOSED",
];

const campaignStateToURI = (state: CampaignState): string => {
  if (state === "RECRUITING") {
    return state.toLocaleLowerCase();
  }
  if (state === "RECRUITMENT_COMPLETED") {
    return "recruitmentCompleted";
  }
  if (state === "EXPERIENCE_AND_REVIEW" || state === "REVIEW_CLOSED") {
    return "review";
  }
  return "";
};

const Page = ({ params }: { params: { campaignId: string } }) => {
  const progressIndex = CAMPAIGN_STATES.findIndex(
    (state) => state === "RECRUITING",
  );

  const { data, isPending, isError } = useQuery<
    unknown,
    unknown,
    CampaignManageResponse
  >({
    queryKey: ["campaigns", "manage", params.campaignId],
    queryFn: () =>
      axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${params.campaignId}/management/${campaignStateToURI("RECRUITING")}`,
      ),
  });

  if (!data) {
    return null;
  }

  const attendees = data.data;

  return (
    <>
      <section className={styles.info}>
        <ManageButtons
          campaignState="RECRUITING"
          handleCheckSchedule={() => {}}
          handleFinishRecruiting={() => {}}
          handleResultReport={() => {}}
        />
        <ManageProgress activeIndex={progressIndex} />
      </section>
      <section className={styles.divider}>
        <Line type="thick" />
      </section>
      <ManageTable attendees={attendees} campaignState="RECRUITING" />
    </>
  );
};

export default Page;
