import Image from "next/image";
import ms from "@/utils/modifierSelector";
import React, { useRef, ChangeEvent } from "react";
import styles from "./index.module.scss";

const cn = ms(styles, "img");

interface ImgUploadProps {
  uploadImg: string;
  setUploadImg: React.Dispatch<React.SetStateAction<string>>;
  label?: boolean;
}
const ImgUpload: React.FC<ImgUploadProps> = ({
  uploadImg,
  setUploadImg,
  label = true,
}) => {
  // 기본 이미지
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 화면에 띄우기
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      if (reader.readyState === 2 && event.target) {
        setUploadImg(event.target.result as string);
      }
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      fileInput.current?.click();
    }
  };

  return (
    <div className={cn("-container")}>
      {label && <label htmlFor="input-file">이미지 등록</label>}

      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        onKeyDown={handleKeyDown}
        aria-label="이미지 업로드"
      >
        <Image src={uploadImg} width={140} height={140} alt="등록 이미지" />
      </button>

      <input
        type="file"
        name="image_URL"
        id="input-file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleUploadImg}
      />
    </div>
  );
};

export default ImgUpload;
