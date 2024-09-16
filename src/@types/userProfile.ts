export interface SNSResponse {
  snsType: string;
  url: string;
}

export interface ProfileInfo {
  name: string;
  snsResponseList: SNSResponse[];
  likeCnt: number;
  email: string;
  phone: number;
  nickname: string;
  address: string;
  addressDetail: string;
  postalCode: string;
  birthday: string;
  gender: string;
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}
