import formatDate from "@/utils/formatDate";
import { BoardPost } from "@/@types/board";
import styles from "./index.module.scss";

const AnnouncementTitle = ({ post }: { post: BoardPost }) => {
  const { title, createdAt, viewCount } = post;

  return (
    <section className={styles.title}>
      <h3 className={styles.title__text}>{title}</h3>
      <ul className={styles.title__info}>
        <li>
          <p>{formatDate(createdAt, "MDMH")}</p>
        </li>
        <li>
          <p>{`조회 ${viewCount.toLocaleString()}`}</p>
        </li>
      </ul>
    </section>
  );
};

export default AnnouncementTitle;
