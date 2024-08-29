import Image from "next/image";
import ms from "@/utils/modifierSelector";
import IconCamera from "@/assets/icons/icon-profile-camera.svg";
import React, { useRef, ChangeEvent } from "react";
import styles from "./index.module.scss";

const cn = ms(styles, "profile-img");

interface ProfileImgUploadProps {
  profileImg: string;
  setProfileImg: React.Dispatch<React.SetStateAction<string>>;
  label?: boolean;
  cameraButon?: boolean;
}

const ProfileImgUpload: React.FC<ProfileImgUploadProps> = ({
  profileImg,
  setProfileImg,
  label = false,
  cameraButon = false,
}) => {
  // 기본 이미지
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 화면에 띄우기
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      if (reader.readyState === 2 && event.target) {
        setProfileImg(event.target.result as string);
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
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        onKeyDown={handleKeyDown}
        aria-label="이미지 업로드"
      >
        <Image src={profileImg} width={95} height={95} alt="프로필 이미지" />
      </button>

      <input
        type="file"
        name="image_URL"
        id="input-file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleProfileImg}
      />
      {cameraButon && <IconCamera onClick={() => fileInput.current?.click()} />}
      {label && <label htmlFor="input-file">프로필 이미지</label>}
    </div>
  );
};

export default ProfileImgUpload;
