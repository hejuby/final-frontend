import IconEmpty from "@/assets/icons/icon-empty.svg";
import styles from "./index.module.scss";

const CampaignEmpty = () => {
  return (
    <div className={styles["empty-container"]}>
      <IconEmpty />
      <p>
        신청한 체험단이 없습니다. <br />
        다인리뷰 체험단에 참여해보세요!
      </p>
    </div>
  );
};

export default CampaignEmpty;
