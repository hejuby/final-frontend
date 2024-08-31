import ProfileInfoEmployer from "@/components/Mypage/Employer/ProfileInfo";
import Line from "@/components/Line";
import Button from "@/components/Button";
import styles from "./page.module.scss";

const MypageProfileEmployer = () => {
  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.title}>내 프로필 수정</h3>
        </header>
        <div className={styles.contents}>
          <ProfileInfoEmployer />
        </div>
        <Line />
        <div className={styles["button-wrapper"]}>
          <Button size="large">저장하기</Button>
        </div>
      </section>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.title}>회원탈퇴</h3>
        </header>
        <div className={styles.contents}>
          <Button color="outline--gray">회원탈퇴하기</Button>
        </div>
      </section>
    </>
  );
};

export default MypageProfileEmployer;
