import React from "react";
import ProfileBoxEmployer from "@/components/Mypage/Employer/ProfileBox";
import InteractionListEmployer from "@/components/Mypage/Employer/InteractionList";
import styles from "./layout.module.scss";

const MypageLayoutEmployer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <h2 className="visually-hidden">마이페이지</h2>
      <div className={styles.layout__left}>
        <ProfileBoxEmployer />
        <InteractionListEmployer />
      </div>
      <div className={styles.layout__right}>{children}</div>
    </div>
  );
};

export default MypageLayoutEmployer;
