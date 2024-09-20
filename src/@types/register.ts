export interface Step1Data {
  platform: string | null;
  type: string | null;
  category: string | null;
  serviceProvided: string;
}

export interface Step2Data {
  businessName: string;
  imageUrl: File | null;
  address: string;
  postalCode: string;
  addressDetail: string;
  contactNumber: string;
}

export interface Step3Data {
  availableDays: string[];
  experienceStartTime: string;
  experienceEndTime: string;
}

export interface Step4Data {
  requirement: string;
  keywords: string[];
}

export interface Step5Data {
  capacity: number;
  pointPayment: boolean;
  pointPerPerson: number;
  totalPoint: number;
}
