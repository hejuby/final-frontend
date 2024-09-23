"use client";

import { notFound } from "next/navigation";
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

const Page = ({
  params,
  searchParams,
}: {
  params: { campaignId: string };
  searchParams: { state: string };
}) => {
  const state = searchParams.state as CampaignState;
  if (!CAMPAIGN_STATES.includes(state)) {
    notFound();
  }

  const progressIndex = CAMPAIGN_STATES.findIndex(
    (campaignState) => campaignState === state,
  );

  const { data, isPending, isError } = useQuery<
    unknown,
    unknown,
    CampaignManageResponse
  >({
    queryKey: ["campaigns", "manage", params.campaignId],
    queryFn: () =>
      axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${params.campaignId}/management/${campaignStateToURI(state)}`,
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
          campaignId={params.campaignId}
          campaignState={state}
          handleCheckSchedule={() => {}}
          handleFinishRecruiting={() => {}}
          handleResultReport={() => {}}
        />
        <ManageProgress activeIndex={progressIndex} />
      </section>
      <section className={styles.divider}>
        <Line type="thick" />
      </section>
      <ManageTable attendees={attendees} campaignState={state} />
    </>
  );
};

export default Page;
