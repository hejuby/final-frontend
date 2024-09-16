"use client";

import { useEffect, useState } from "react";
import { ProfileInfo } from "@/@types/userProfile";
import { useForm } from "react-hook-form";
import useDialog from "@/hooks/useDialog";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./index.module.scss";

interface ProfileInfoEmployerProps {
  profileInfo: ProfileInfo;
  onChange: (updatedField: Partial<ProfileInfo>) => void;
  onSubmit: (data: ProfileInfo) => void;
}

const ProfileInfoEmployer = ({
  profileInfo,
  onChange,
  onSubmit,
}: ProfileInfoEmployerProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ProfileInfo>({
    shouldFocusError: true,
    defaultValues: profileInfo,
  });

  const [isDetailAddressEdit, setIsDetailAddressEdit] = useState(false);
  const [address, setAddress] = useState({
    zonecode: profileInfo.postalCode || "",
    address: profileInfo.address || "",
    detailAddress: profileInfo.addressDetail || "",
  });
  const [isDaumLoad, setIsDaumLoad] = useState(false);
  const { alert } = useDialog();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    onChange({ [id]: value });
  };

  // 다음 API 호출
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      setIsDaumLoad(true);
    };
    document.body.appendChild(script);
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleAddressClick = async () => {
    if (isDaumLoad && window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete(data: any) {
          setAddress({
            ...address,
            address: data.address,
            zonecode: data.zonecode,
          });
          onChange({
            address: data.address,
            postalCode: data.zonecode,
          });
          setIsDetailAddressEdit(true);
        },
      }).open();
    } else {
      await alert("Daum Postcode API가 로드되지 않았습니다.");
    }
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newDetailAddress = e.target.value;
    setAddress({
      ...address,
      detailAddress: newDetailAddress,
    });
    onChange({
      addressDetail: newDetailAddress,
    });
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
            label="업체명"
            horizontal
            infoMessage="문자 종류 제한 없이 50자까지 가능"
            value={profileInfo.nickname}
            onChange={handleInputChange}
            register={register("nickname", {
              maxLength: {
                value: 10,
                message: "업체명은 최대 10자까지 가능합니다.",
              },
              pattern: {
                value: /^[가-힣a-zA-Z0-9]+$/,
                message: "업체명은 한글, 영문, 숫자만 가능합니다.",
              },
            })}
            error={errors.nickname?.message}
          />
          <div className={styles["address-container"]}>
            <Input
              id="postalCode"
              type="text"
              label="주소 (선택)"
              placeholder="우편번호"
              gap={5}
              horizontal
              readOnly
              value={address.zonecode || ""}
            />
            <Button size="medium" color="outline" onClick={handleAddressClick}>
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
            value={address.address || ""}
            readOnly
          />
          <Input
            id="addressDetail"
            type="text"
            placeholder="상세주소"
            infoMessage="체험단 응모시 사용할 주소를 입력해주세요."
            horizontal
            label=" "
            value={address.detailAddress || ""}
            onChange={handleDetailAddressChange}
            readOnly={!isDetailAddressEdit}
          />
        </form>
      </div>
    </div>
  );
};
export default ProfileInfoEmployer;
