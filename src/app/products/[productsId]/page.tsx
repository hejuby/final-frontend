"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICampaignDetails } from "@/@types/campaignItems";
import Loading from "@/app/Loading";
import DeatilComponent from "../page";

const Product = () => {
  const { productsId } = useParams();
  const [campaignData, setCampaignData] = useState<ICampaignDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  // 캠페인 상세 데이터 호출
  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${productsId}`,
        );
        setCampaignData(response.data);
      } finally {
        setIsLoading(false);
      }
    };

    if (productsId) {
      getProductData();
    }
  }, [productsId]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!campaignData) {
    return null;
  }

  return (
    <div>
      <DeatilComponent campaignData={campaignData} />
    </div>
  );
};

export default Product;
