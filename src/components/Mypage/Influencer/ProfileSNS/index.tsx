import SNSInput from "@/components/SNSInput";
import styles from "./index.module.scss";

const ProfileSNS = () => {
  return (
    <div className={styles.container}>
      <div className={styles["form-wrapper"]}>
        <form action="">
          <SNSInput id="blog" type="blog" placeholder="네이버 블로그" gap={5} />
          <SNSInput
            id="instargram"
            type="instargram"
            placeholder="인스타그램"
            gap={5}
          />
          <SNSInput id="youtube" type="youtube" placeholder="유튜브" gap={5} />
          <SNSInput id="tictok" type="tictok" placeholder="틱톡" gap={5} />
          <SNSInput id="etc" type="etc" placeholder="기타" gap={5} />
        </form>
      </div>
    </div>
  );
};
export default ProfileSNS;
