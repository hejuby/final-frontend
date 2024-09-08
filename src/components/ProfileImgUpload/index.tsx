import Image from "next/image";
import ms from "@/utils/modifierSelector";
import useDialog from "@/hooks/useDialog";
import IconCamera from "@/assets/icons/icon-profile-camera.svg";
import React, { useRef, ChangeEvent, useState, useEffect } from "react";
import styles from "./index.module.scss";
import Button from "../Button";

const cn = ms(styles, "profile-img");

interface ProfileImgUploadProps {
  profileImg: File | null;
  setProfileImg: React.Dispatch<React.SetStateAction<File | null>>;
  defaultImg: string;
  label?: boolean;
  cameraButon?: boolean;
}

const ProfileImgUpload: React.FC<ProfileImgUploadProps> = ({
  profileImg,
  setProfileImg,
  defaultImg,
  label = false,
  cameraButon = false,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [previewImg, setPreviewImg] = useState<string>(defaultImg);
  const [isUpload, setIsUpload] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  const { alert } = useDialog();

  useEffect(() => {
    if (profileImg) {
      const objectUrl = URL.createObjectURL(profileImg);
      setPreviewImg(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    setPreviewImg(defaultImg);

    return () => {};
  }, [profileImg, defaultImg]);

  const handleProfileImg = async (file: File) => {
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

    setProfileImg(file);
    setIsUpload(true);
  };

  // Drag & Drop
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProfileImg(file);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProfileImg(file);
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
    setProfileImg(null);
    setIsUpload(false);
  };

  return (
    <div
      className={`${cn("-container")} ${isDrag ? styles["drag-over"] : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        onKeyDown={handleKeyDown}
        aria-label="이미지 업로드"
        className={styles["img-upload-button"]}
      >
        <Image src={previewImg} width={95} height={95} alt="프로필 이미지" />
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

      {cameraButon && <IconCamera onClick={() => fileInput.current?.click()} />}
      {label && <label htmlFor="input-file">프로필 이미지</label>}

      <div className={styles["img-default-button"]}>
        {isUpload && (
          <Button
            type="button"
            onClick={handleResetImg}
            aria-label="이미지 초기화"
          >
            기본 이미지로 설정하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileImgUpload;
