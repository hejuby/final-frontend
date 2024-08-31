"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import BoxRadioButton from "@/components/BoxRadioButton";
import styles from "./index.module.scss";

const ProfileInfoAdd = () => {
  const [gender, setGender] = useState<string | null>(null);

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles["form-wrapper"]}>
        <form action="">
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
          <Input id="date" type="date" label="생년월일" horizontal />
          <BoxRadioButton
            options={[
              { value: "male", optionLabel: "남자" },
              { value: "female", optionLabel: "여자" },
            ]}
            onChange={handleGenderChange}
            selectedValue={gender}
            label="성별"
            horizontal
          />
        </form>
      </div>
    </div>
  );
};
export default ProfileInfoAdd;
