"use client";

import { useState, useEffect } from "react";
import { CampaignState } from "@/@types/myCampaignItems";
import Button from "@/components/Button";
import styles from "./index.module.scss";

interface ManageButtonsProps {
  campaignState: CampaignState;
  handleCheckSchedule: () => void;
  handleFinishRecruiting: () => void;
  handleResultReport: () => void;
}

const ManageButtons = ({
  campaignState,
  handleCheckSchedule,
  handleFinishRecruiting,
  handleResultReport,
}: ManageButtonsProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    handleResize();
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.nav}>
      {campaignState === "RECRUITING" && (
        <>
          <Button color="outline" full={isMobile} onClick={handleCheckSchedule}>
            일정확인
          </Button>
          <Button
            color="solid"
            full={isMobile}
            onClick={handleFinishRecruiting}
          >
            모집종료
          </Button>
        </>
      )}
      {(campaignState === "RECRUITMENT_COMPLETED" ||
        campaignState === "EXPERIENCE_AND_REVIEW") && (
        <Button color="outline" full={isMobile} onClick={handleCheckSchedule}>
          일정확인
        </Button>
      )}
      {campaignState === "REVIEW_CLOSED" && (
        <>
          <Button color="outline" full={isMobile} onClick={handleCheckSchedule}>
            일정확인
          </Button>
          <Button color="solid" full={isMobile} onClick={handleResultReport}>
            결과 보고서
          </Button>
        </>
      )}
    </nav>
  );
};

export default ManageButtons;
