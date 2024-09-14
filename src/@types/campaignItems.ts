export interface ICampaignItems {
  id?: number;
  businessName: string; // 사업장 이름
  imageUrl: string;
  currentApplicants: number; // 현재 지원자 수
  capacity: number; // 지원 가능한 총 지원자 수
  campaignState: string;
  pointPerPerson: number; // 포인트
  city: string; // 도,시
  district: string; // 시, 군, 구
  type: string; // 타입 (배송형, 구매형, 기자단 etc...)
  label: string; // 라벨 (프리미엄, 일반체험단, 다인체험단)
  platform: string; // 플랫폼 (인스타, 유뷰트, 틱톡, etc...)
  experienceStartDate: string; // 체험 시작 날짜
  experienceEndDate: string; // 체험 종료 날짜
  applicationDeadline?: number; // 지원 마감일
  isCancel?: boolean; // 취소여부
}

export interface ICampaignDetails {
  id: number;
  businessName: string; // 사업장 이름
  imageUrl: string;
  contactNumber: string; // 사업장 연락처
  address: string; // 사업장 주소
  postalCode: string | null;
  latitude: number | null; // 위도
  longitude: number | null; // 경도
  availableDays: string[]; // 체험 가능일
  type: string; // 타입 (배송형, 구매형, 기자단 etc...)
  category: string; // 카테고리 (맛집, )
  platform: string; // 플랫폼 (인스타, 유뷰트, 틱톡, etc...)
  label: string; // 라벨 (프리미엄, 일반체험단, 다인체험단)
  capacity: number; // 지원 가능한 총 지원자 수
  currentApplicants: number; // 현재 지원자 수
  serviceProvided: string; // 서비스 제공내역
  requirement: string; // 사업주 요구사항
  keywords: string[]; // 키워드
  pointPayment: boolean; // 포인트 지불여부
  pointPerPerson: number; // 포인트
  totalPoints: number; // 총 포인트
  applicationStartDate: string; // 모집 시작날짜
  applicationEndDate: string; // 모집 종료날짜
  announcementDate: string; // 결과 발표
  experienceStartDate: string; // 체험 시작날짜
  experienceEndDate: string; // 체험 종료 날짜
  reviewDate: string; // 리뷰 마감
}
