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
        <p>{formatDate(date, "YMD")}</p>
        <p>{`조회 ${viewCount.toLocaleString()}`}</p>
      </section>
    </li>
  );
};

export default AnnouncementItem;
