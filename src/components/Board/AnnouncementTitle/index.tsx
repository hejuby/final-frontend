import formatDate from "@/utils/formatDate";
import { CommunityItemProps } from "../ListItem";
import styles from "./index.module.scss";

const AnnouncementTitle = ({ post }: { post: CommunityItemProps }) => {
  const { id, userId, title, date, viewCount } = post;

  return (
    <section className={styles.title}>
      <h3 className={styles.title__text}>{title}</h3>
      <ul className={styles.title__info}>
        <li>
          <p>{formatDate(date, "MDMH")}</p>
        </li>
        <li>
          <p>{`조회 ${viewCount.toLocaleString()}`}</p>
        </li>
      </ul>
    </section>
  );
};

export default AnnouncementTitle;
