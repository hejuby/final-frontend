"use client";

import { useEffect, useState } from "react";
import { ProfileInfo } from "@/@types/userProfile";
import useDialog from "@/hooks/useDialog";
import Input from "@/components/Input";
import Button from "@/components/Button";
import BoxRadioButton from "@/components/BoxRadioButton";
import styles from "./index.module.scss";

interface ProfileInfoAddProps {
  profileInfoAdd: ProfileInfo;
  onChange: (updatedField: Partial<ProfileInfo>) => void;
}

const ProfileInfoAdd = ({ profileInfoAdd, onChange }: ProfileInfoAddProps) => {
  const [gender, setGender] = useState<string | null>(
    profileInfoAdd.gender === "MALE" ? "male" : "female",
  );
  const [isDetailAddressEdit, setIsDetailAddressEdit] = useState(false);
  const [address, setAddress] = useState({
    zonecode: profileInfoAdd.postalCode || "",
    address: profileInfoAdd.address || "",
    detailAddress: profileInfoAdd.addressDetail || "",
  });
  const [isDaumLoad, setIsDaumLoad] = useState(false);
  const { alert } = useDialog();

  const handleGenderChange = (value: string) => {
    setGender(value);
    onChange({ gender: value === "male" ? "MALE" : "FEMALE" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value });
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
        <form className={styles.form}>
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
          <Input
            id="birthday"
            type="date"
            label="생년월일"
            horizontal
            value={profileInfoAdd.birthday || ""}
            onChange={handleInputChange}
          />
          <BoxRadioButton
            options={[
              { value: "male", optionLabel: "남자" },
              { value: "female", optionLabel: "여자" },
            ]}
            onChange={handleGenderChange}
            selectedValue={gender || ""}
            label="성별"
            horizontal
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileInfoAdd;
