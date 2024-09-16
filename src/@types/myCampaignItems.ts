export interface CampaignItem {
  id: number;
  businessName: string;
  imageUrl: string;
  serviceProvided: string;
  currentApplicants: number;
  capacity: number;
  campaignState: string;
  pointPerPerson: number;
  city: string;
  district: string;
  type: string;
  label: string;
  platform: string;
  experienceStartDate: string;
  experienceEndDate: string;
  applicationDeadline: number;
  isLike: boolean;
  isCancellable?: boolean;
  isCancel?: boolean;
}

export interface CampaignItemProps {
  campaignItems: CampaignItem[];
}
