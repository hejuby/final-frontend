"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ImgUpload from "@/components/ImgUpload";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const VisitStep2 = () => {
  const [uploadImg, setUploadImg] = useState("/icons/icon-upload.svg");

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>사업주 정보</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>
            3. 상호명 및 썸네일 이미지 등록
          </h4>
          <Input
            id="name"
            type="text"
            label="상호명"
            placeholder="업체 이름 입력"
            full
          />
          <ImgUpload uploadImg={uploadImg} setUploadImg={setUploadImg} />
        </article>
        <article className={styles.article}>
          <div className={styles["sub-title"]}>4. 방문 체험할 장소의 주소</div>
          <div className={styles["address-container"]}>
            <Input
              id="postalCode"
              type="text"
              placeholder="우편번호"
              gap={5}
              full
            />
            <Button size="medium" color="outline">
              주소 검색
            </Button>
          </div>
          <Input id="address" type="text" placeholder="주소" gap={5} full />
          <Input
            id="addressDetail"
            type="text"
            placeholder="상세주소"
            full
            gap={5}
          />
          <p className={styles["info-message"]}>
            체험단 모집시 사용할 주소를 입력해 주세요.
          </p>
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>5. 연락처</h4>
          <Input id="phone" type="number" placeholder="- 없이 입력" full />
        </article>
      </div>
    </section>
  );
};
export default VisitStep2;
