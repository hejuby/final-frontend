export interface ICampaignItems {
  id?: number;
  businessName: string; // 사업장 이름
  imageUrl: string;
  currentApplicants: number; // 현재 지원자 수
  capacity: number; // 지원 가능한 총 지원자
  campaignState: string;
  pointPerPerson: number; // 포인트
  city: string; // 도,시
  district: string; // 시, 군, 구
  type: string; // 타입 (배송형, 구매형, 기자단 etc...)
  label: string; // 라벨 (프리미엄, 일반체험단, 다인체험단)
  platform: string; // 플랫폼 (인스타, 유뷰트, 틱, etc...)
  experienceStartDate: string; // 체험 시작 날짜
  experienceEndDate: string; // 체험 종료 날짜
  applicationDeadline?: number; // 지원 마감일
  isCancel?: boolean; // 취소여부
}
