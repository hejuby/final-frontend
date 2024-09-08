"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useDialog from "@/hooks/useDialog";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ProfileImgUpload from "@/components/ProfileImgUpload";
import BoxRadioButton from "@/components/BoxRadioButton";
import styles from "./index.module.scss";

const ProfileInfluencer = () => {
  const router = useRouter();

  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [isDetailAddressEditable, setIsDetailAddressEditable] = useState(false);
  const [address, setAddress] = useState({
    zonecode: "",
    address: "",
    detailAddress: "",
  });

  const { confirm } = useDialog();

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  // 다음 API 호출
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePostcodeClick = () => {
    new window.daum.Postcode({
      // eslint-disable-next-line
      oncomplete: function (data: any) {
        setAddress({
          ...address,
          address: data.address,
          zonecode: data.zonecode,
        });
        setIsDetailAddressEditable(true);
      },
    }).open();
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddress({
      ...address,
      detailAddress: e.target.value,
    });
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (profileImg) {
      formData.append("profileImage", profileImg);
    }
    formData.append("birthday", birthday);
    formData.append("gender", gender === "male" ? "MALE" : "FEMALE");
    formData.append("address", address.address);
    formData.append("addressDetail", address.detailAddress);
    formData.append("postalCode", address.zonecode);

    try {
      const response = await axios.post(
        "/api/influencer/sign-up/extra",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("제출 성공적으로 완료", response.data);
    } catch (error) {
      console.error("실패실패", error);
    }
  };

  const handleCancelClick = async () => {
    const confirmCancel = await confirm(
      "작성 중인 내용이 사라집니다. 계속하시겠습니까?",
    );

    if (confirmCancel) {
      router.push("/auth/login");
    }
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>프로필 설정 &#40;선택&#41;</h2>
        <p>나를 나타내는 프로필을 설정 해보세요.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["img-wrapper"]}>
          <ProfileImgUpload
            profileImg={profileImg}
            setProfileImg={setProfileImg}
            label
            defaultImg="/images/profile-default.png"
          />
        </div>

        <Input
          id="date"
          type="date"
          label="생년월일"
          full
          value={birthday}
          onChange={handleBirthdayChange}
        />

        <BoxRadioButton
          options={[
            { value: "male", optionLabel: "남자" },
            { value: "female", optionLabel: "여자" },
          ]}
          onChange={handleGenderChange}
          selectedValue={gender}
          label="성별"
        />

        <div className={styles["address-container"]}>
          <Input
            id="postalCode"
            type="text"
            label="주소 (선택)"
            full
            placeholder="우편번호"
            gap={5}
            readOnly
            value={address.zonecode}
          />
          <Button size="medium" color="outline" onClick={handlePostcodeClick}>
            주소 검색
          </Button>
        </div>

        <Input
          id="address"
          type="text"
          full
          placeholder="주소"
          gap={5}
          value={address.address}
          readOnly
        />

        <Input
          id="addressDetail"
          type="text"
          full
          placeholder="상세주소"
          infoMessage="체험단 응모시 사용할 주소를 입력해주세요."
          gap={0}
          value={address.detailAddress}
          onChange={handleDetailAddressChange}
          readOnly={!isDetailAddressEditable}
        />
        <div className={styles["button-container"]}>
          <Button size="medium" full type="submit">
            확인
          </Button>
          <Button
            size="medium"
            color="outline"
            full
            onClick={handleCancelClick}
          >
            취소
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProfileInfluencer;
