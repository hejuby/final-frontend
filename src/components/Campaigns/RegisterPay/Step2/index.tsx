import { Step2Data } from "@/@types/register";
import Input from "@/components/Input";
import ImgUpload from "@/components/ImgUpload";
import styles from "./index.module.scss";

interface PayStep2Props {
  stepData: Step2Data;
  setStepData: (data: Step2Data) => void;
}

const PayStep2: React.FC<PayStep2Props> = ({ stepData, setStepData }) => {
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
          <h4 className={styles["sub-title"]}>4. 연락처</h4>
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
export default PayStep2;
