"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ImgUpload from "@/components/ImgUpload";
import styles from "./index.module.scss";

const PayStep2 = () => {
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
          <h4 className={styles["sub-title"]}>4 . 연락처</h4>
          <Input id="phone" type="number" placeholder="- 없이 입력" full />
        </article>
      </div>
    </section>
  );
};
export default PayStep2;
