import { ICampaignDetails } from "@/@types/campaignItems";
import axios from "axios";
import NotFound from "@/components/NotFound";
import Page from "../page";

const ProductPage = async ({ params }: { params: { productsId: string } }) => {
  const { productsId } = params;

  try {
    const response = await axios.get<ICampaignDetails>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${productsId}`,
    );
    const campaignData = response.data;

    return <Page campaignData={campaignData} />;
  } catch (error) {
    return <NotFound />;
  }
};

export default ProductPage;
