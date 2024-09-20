"use client";

import { useEffect, useState } from "react";
import { Step2Data } from "@/@types/register";
import Input from "@/components/Input";
import ImgUpload from "@/components/ImgUpload";
import Button from "@/components/Button";
import styles from "./index.module.scss";

interface VisitStep2Props {
  stepData: Step2Data;
  setStepData: (data: Step2Data) => void;
}

const VisitStep2: React.FC<VisitStep2Props> = ({ stepData, setStepData }) => {
  const [isDetailAddressEdit, setIsDetailAddressEdit] = useState(false);

  // 다음 API 호출
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleAddressClick = () => {
    if (typeof window !== "undefined" && window.daum) {
      new window.daum.Postcode({
        oncomplete(data: any) {
          setStepData({
            ...stepData,
            address: data.address,
            postalCode: data.zonecode,
          });
          setIsDetailAddressEdit(true);
        },
      }).open();
    }
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStepData({
      ...stepData,
      addressDetail: e.target.value,
    });
  };

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepData({
      ...stepData,
      businessName: e.target.value,
    });
  };

  const handleContactNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStepData({
      ...stepData,
      contactNumber: e.target.value,
    });
  };

  const handleUploadImgChange = (file: File | null) => {
    setStepData({
      ...stepData,
      imageUrl: file,
    });
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>사업주 정보</h3>
      <div>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>
            3. 상호명 및 썸네일 이미지 등록
          </h4>
          <Input
            id="businessName"
            type="text"
            label="상호명"
            placeholder="업체 이름 입력"
            full
            value={stepData.businessName}
            onChange={handleBusinessNameChange}
          />
          <ImgUpload
            uploadImg={stepData.imageUrl}
            setUploadImg={handleUploadImgChange}
            label
            defaultImg="/images/register-default.png"
          />
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
              readOnly
              value={stepData.postalCode}
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
            full
            readOnly
            value={stepData.address}
          />
          <Input
            id="addressDetail"
            type="text"
            placeholder="상세주소"
            full
            gap={5}
            value={stepData.addressDetail}
            onChange={handleDetailAddressChange}
            readOnly={!isDetailAddressEdit}
          />
          <p className={styles["info-message"]}>
            체험단 모집시 사용할 주소를 입력해 주세요.
          </p>
        </article>
        <article className={styles.article}>
          <h4 className={styles["sub-title"]}>5. 연락처</h4>
          <Input
            id="contactNumber"
            type="number"
            placeholder="- 없이 입력"
            full
            value={stepData.contactNumber}
            maxLength={9}
            onChange={handleContactNumberChange}
          />
        </article>
      </div>
    </section>
  );
};
export default VisitStep2;
