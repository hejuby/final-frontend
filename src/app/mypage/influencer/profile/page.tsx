import ProfileInfoInfluencer from "@/components/Mypage/Influencer/ProfileInfo";
import ProfileInfoAdd from "@/components/Mypage/Influencer/ProfileInfoAdd";
import ProfileSNS from "@/components/Mypage/Influencer/ProfileSNS";
import Line from "@/components/Line";
import Button from "@/components/Button";
import styles from "./page.module.scss";

const MypageProfileInfluencer = () => {
  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.title}>내 프로필 수정</h3>
        </header>
        <div className={styles.contents}>
          <ProfileInfoInfluencer />
        </div>
      </section>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.title}>SNS 주소</h3>
          <p>
            사용하실 SNS 주소 <span className="text-underline">최소 1개</span>를
            입력해주세요.
          </p>
        </header>
        <div>
          <ProfileSNS />
        </div>
      </section>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.title}>추가 정보</h3>
        </header>
        <div className={styles.contents}>
          <ProfileInfoAdd />
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

export default MypageProfileInfluencer;
