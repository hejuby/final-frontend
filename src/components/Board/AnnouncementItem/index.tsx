import Link from "next/link";
import formatDate from "@/utils/formatDate";
import { CommunityItemProps } from "../ListItem";
import styles from "./index.module.scss";

const AnnouncementItem = ({
  id,
  title,
  date,
  viewCount,
}: CommunityItemProps) => {
  return (
    <li className={styles.item}>
      <Link className={styles.item__link} href={`/announcement/${id}`}>
        <h3>{title}</h3>
      </Link>
      <section className={styles.item__info}>
        <p className={styles.date}>{formatDate(date, "YMD")}</p>
        <div className={styles.views}>
          <p className={styles.views__text}>조회&nbsp;</p>
          <p>{viewCount.toLocaleString()}</p>
        </div>
      </section>
    </li>
  );
};

export default AnnouncementItem;
