import Input from "@/components/Input";
import styles from "./index.module.scss";

const ProfileInfoInfluencer = () => {
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
            infoMessage="8자 이상의 영문, 숫자, 특수문자 중 2가지 이상"
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
          <Input id="name" type="text" label="닉네임" horizontal />
        </form>
      </div>
    </div>
  );
};
export default ProfileInfoInfluencer;
