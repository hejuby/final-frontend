export type CampaignState =
  | "INSPECTION"
  | "RECRUITING"
  | "RECRUITMENT_COMPLETED"
  | "EXPERIENCE_AND_REVIEW"
  | "REVIEW_CLOSED";

export interface CampaignItem {
  id: number;
  businessName: string;
  imageUrl: string;
  serviceProvided: string;
  currentApplicants: number;
  capacity: number;
  campaignState: CampaignState;
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

export interface CampaignAttendee {
  userId: number;
  name: string;
  isChoice: boolean;
  cancelledApplicationCount: 0;
  phone: string;
  message: string;
  reviewDate: string | null;
  reviewUrl: string | null;
  capacity: number;
}

export interface CampaignManageResponse {
  data: CampaignAttendee[];
}
