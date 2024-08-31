import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const ProfileInfoEmployer = () => {
  return (
    <div className={styles.container}>
      <div className={styles["form-wrapper"]}>
        <form action="">
          <Input id="email" type="email" label="이메일" horizontal disabled />
          <Input
            id="password"
            type="password"
            label="현재 비밀번호"
            gap={5}
            horizontal
          />
          <Input
            id="newPassword"
            type="password"
            label="새 비밀번호"
            gap={5}
            horizontal
          />
          <Input
            id="newPassword2"
            type="password"
            label="새 비밀번호 확인"
            infoMessage="8자 이상의 영문, 숫자, 특수문자 중 2가지이상"
            horizontal
          />
          <Input
            id="name"
            type="text"
            label="이름"
            horizontal
            infoMessage="실명으로 등록하지 않을 경우 불이익이 있을 수 있습니다."
          />
          <Input id="phone" type="number" label="전화번호" horizontal />
          <Input
            id="name"
            type="text"
            label="업체명"
            horizontal
            infoMessage="문자 종류 제한 없이 50자까지 가능"
          />
          <div className={styles["address-container"]}>
            <Input
              id="postalCode"
              type="text"
              label="주소 (선택)"
              placeholder="우편번호"
              gap={5}
              horizontal
            />
            <Button size="medium" color="outline">
              주소 검색
            </Button>
          </div>
          <Input
            id="address"
            type="text"
            placeholder="주소"
            gap={5}
            horizontal
            label=" "
          />
          <Input
            id="addressDetail"
            type="text"
            placeholder="상세주소"
            infoMessage="체험단 응모시 사용할 주소를 입력해주세요."
            horizontal
            label=" "
          />
        </form>
      </div>
    </div>
  );
};
export default ProfileInfoEmployer;
