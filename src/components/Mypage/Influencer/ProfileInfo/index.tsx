import { ProfileInfo } from "@/@types/userProfile";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import styles from "./index.module.scss";

interface ProfileInfoInfluencerProps {
  profileInfo: ProfileInfo;
  onChange: (updatedField: Partial<ProfileInfo>) => void;
  onSubmit: (data: ProfileInfo) => void;
}

const ProfileInfoInfluencer = ({
  profileInfo,
  onChange,
  onSubmit,
}: ProfileInfoInfluencerProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ProfileInfo>({
    shouldFocusError: true,
    defaultValues: profileInfo,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    onChange({ [id]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles["form-wrapper"]}>
        <form
          id="profileForm"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="email"
            type="email"
            label="이메일"
            horizontal
            disabled
            value={profileInfo.email}
          />
          <Input
            id="oldPassword"
            type="password"
            label="현재 비밀번호"
            gap={5}
            horizontal
            onChange={handleInputChange}
            register={register("oldPassword", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자 이상이어야 합니다.",
              },
              pattern: {
                value:
                  /((?=.*[a-zA-Z])(?=.*[\W_]))|((?=.*[a-zA-Z])(?=.*\d))|((?=.*\d)(?=.*[\W_]))/,
                message:
                  "비밀번호는 영문, 숫자, 특수문자 중 2가지를 포함해야 합니다.",
              },
            })}
            error={errors.oldPassword?.message}
          />
          <Input
            id="newPassword"
            type="password"
            label="새 비밀번호"
            gap={5}
            horizontal
            onChange={handleInputChange}
            register={register("newPassword", {
              required: "새 비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자 이상이어야 합니다.",
              },
              pattern: {
                value:
                  /((?=.*[a-zA-Z])(?=.*[\W_]))|((?=.*[a-zA-Z])(?=.*\d))|((?=.*\d)(?=.*[\W_]))/,
                message:
                  "비밀번호는 영문, 숫자, 특수문자 중 2가지를 포함해야 합니다.",
              },
              validate: {
                notSameAsOldPassword: (newPassword) => {
                  return (
                    newPassword !== getValues("oldPassword") ||
                    "현재 비밀번호와 새 비밀번호가 동일할 수 없습니다."
                  );
                },
              },
            })}
            error={errors.newPassword?.message}
          />
          <Input
            id="newPasswordConfirm"
            type="password"
            label="새 비밀번호 확인"
            infoMessage="8자 이상의 영문, 숫자, 특수문자 중 2가지 이상"
            horizontal
            onChange={handleInputChange}
            register={register("newPasswordConfirm" as any, {
              required: "비밀번호를 한번 더 입력해주세요.",
              validate: {
                check: (newPasswordConfirm) => {
                  if (getValues("newPassword") !== newPasswordConfirm) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                  return true;
                },
              },
            })}
            error={errors.newPasswordConfirm?.message}
          />
          <Input
            id="name"
            type="text"
            label="이름"
            horizontal
            infoMessage="실명으로 등록하지 않을 경우 불이익이 있을 수 있습니다."
            value={profileInfo.name}
            onChange={handleInputChange}
            readOnly
          />
          <Input
            id="phone"
            type="number"
            label="전화번호"
            horizontal
            value={profileInfo.phone}
            onChange={handleInputChange}
            readOnly
          />
          <Input
            id="nickname"
            type="text"
            label="닉네임"
            horizontal
            value={profileInfo.nickname}
            onChange={handleInputChange}
            register={register("nickname", {
              maxLength: {
                value: 10,
                message: "닉네임은 최대 10자까지 가능합니다.",
              },
              pattern: {
                value: /^[가-힣a-zA-Z0-9]+$/,
                message: "닉네임은 한글, 영문, 숫자만 가능합니다.",
              },
            })}
            error={errors.nickname?.message}
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileInfoInfluencer;
