import React from "react";
import ProfileBoxInfluencer from "@/components/Mypage/Influencer/ProfileBox";
import InteractionListInfluencer from "@/components/Mypage/Influencer/InteractionList";
import styles from "./layout.module.scss";

const MypageLayoutInfluencer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.layout}>
      <h2 className="visually-hidden">마이페이지</h2>
      <div className={styles.layout__left}>
        <ProfileBoxInfluencer />
        <InteractionListInfluencer />
      </div>
      <div className={styles.layout__right}>{children}</div>
    </div>
  );
};

export default MypageLayoutInfluencer;
