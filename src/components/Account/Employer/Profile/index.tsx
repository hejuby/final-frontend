"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ProfileImgUpload from "@/components/ProfileImgUpload";
import styles from "./index.module.scss";

const ProfileEmployer = () => {
  const [profileImg, setProfileImg] = useState("/images/profile-default.png");

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>프로필 설정 &#40;선택&#41;</h2>
        <p>업체를 나타내는 프로필을 설정 해보세요.</p>
      </header>

      <form className={styles.form}>
        <div className={styles["img-wrapper"]}>
          <ProfileImgUpload
            profileImg={profileImg}
            setProfileImg={setProfileImg}
            label
          />
        </div>
        <div className={styles["address-container"]}>
          <Input
            id="postalCode"
            type="text"
            label="주소 (선택)"
            full
            placeholder="우편번호"
            gap={5}
          />
          <Button size="medium" color="outline">
            주소 검색
          </Button>
        </div>
        <Input id="address" type="text" full placeholder="주소" gap={5} />
        <Input
          id="addressDetail"
          type="text"
          full
          placeholder="상세주소"
          infoMessage="체험단 응모시 사용할 주소를 입력해주세요."
          gap={0}
        />
      </form>

      <div className={styles["button-container"]}>
        <Button size="medium" full>
          확인
        </Button>
        <Button size="medium" color="outline" full>
          취소
        </Button>
      </div>
    </section>
  );
};

export default ProfileEmployer;
