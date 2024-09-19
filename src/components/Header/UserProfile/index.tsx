import React from "react";
import Image from "next/image";
import IconProfile from "@/assets/icons/icon-profile.svg?url";
import styles from "../index.module.scss";

interface UserInfo {
  userName?: string;
  profileImg?: string;
  checkInfluencer?: boolean;
}

interface IUserProfileProps {
  userInfo: UserInfo;
}

const UserProfile: React.FC<IUserProfileProps> = ({ userInfo }) => {
  const profileImageSrc = userInfo.profileImg || IconProfile;
  return (
    <div className={styles.profile}>
      <div>
        <Image
          src={profileImageSrc}
          alt="profileImage"
          width={36}
          height={36}
        />
      </div>
      <p>{userInfo.userName}</p>
    </div>
  );
};

export default UserProfile;
