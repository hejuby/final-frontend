import Image from "next/image";
import ms from "@/utils/modifierSelector";
import React, { useRef, ChangeEvent, useState, useEffect } from "react";
import useDialog from "@/hooks/useDialog";
import IconDefaultImg from "@/assets/icons/icon-default-img.svg";
import styles from "./index.module.scss";

const cn = ms(styles, "img");

interface ImgUploadProps {
  uploadImg: File | null;
  setUploadImg: (file: File | null) => void;
  defaultImg: string;
  label?: boolean;
}

const ImgUpload: React.FC<ImgUploadProps> = ({
  uploadImg,
  setUploadImg,
  defaultImg,
  label = false,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [previewImg, setPreviewImg] = useState<string>(defaultImg);
  const [isUpload, setIsUpload] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  const { alert } = useDialog();

  useEffect(() => {
    if (uploadImg) {
      const objectUrl = URL.createObjectURL(uploadImg);
      setPreviewImg(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    setPreviewImg(defaultImg);

    return () => {};
  }, [uploadImg, defaultImg]);

  const handleuploadImg = async (file: File) => {
    const maxFileSize = 10 * 1024 * 1024;
    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/bmp",
      "image/gif",
      "image/tiff",
      "image/webp",
      "image/svg+xml",
    ];

    if (file.size > maxFileSize) {
      await alert("10MB 이하의 파일만 업로드할 수 있습니다.");
      return;
    }

    if (!allowedFileTypes.includes(file.type)) {
      await alert(
        "지원되는 파일 형식이 아닙니다. (jpg, jpeg, png, bmp, gif, tiff, webp, svg)",
      );
      return;
    }

    setUploadImg(file);
    setIsUpload(true);
  };

  // Drag & Drop
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleuploadImg(file);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleuploadImg(file);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
  };
  const handleDragLeave = () => {
    setIsDrag(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      fileInput.current?.click();
    }
  };

  const handleResetImg = () => {
    setUploadImg(null);
    setIsUpload(false);
  };

  return (
    <div
      className={`${cn("-container")} ${isDrag ? styles["drag-over"] : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {label && <label htmlFor="input-file">이미지 등록</label>}
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        onKeyDown={handleKeyDown}
        aria-label="이미지 업로드"
      >
        <Image src={previewImg} width={140} height={140} alt="등록 이미지" />
      </button>
      <input
        type="file"
        name="image_URL"
        id="input-file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleFileInputChange}
      />

      <span className={styles["img-default-button"]}>
        {isUpload && (
          <button
            type="button"
            onClick={handleResetImg}
            aria-label="이미지 초기화"
          >
            <IconDefaultImg />
          </button>
        )}
      </span>
    </div>
  );
};

export default ImgUpload;
