"use client";

import RegisterFormStep from "@/components/Campaigns/RegisterFormStep";
import { useEffect } from "react";

const CampaignRegisterPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = `var(--gray-10)`;

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return <RegisterFormStep />;
};

export default CampaignRegisterPage;
