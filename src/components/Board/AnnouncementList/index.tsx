import AnnouncementItem from "../AnnouncementItem";
import { CommunityItemProps } from "../ListItem";
import styles from "./index.module.scss";

interface ListProps {
  items: CommunityItemProps[];
}

const AnnouncementList = ({ items }: ListProps) => {
  return (
    <article className={styles.list}>
      <aside>
        <ul className={styles.top}>
          <li className={styles.top__title}>
            <p>제목</p>
          </li>
          <li className={styles.top__date}>
            <p>등록일</p>
          </li>
          <li className={styles.top__views}>
            <p>조회수</p>
          </li>
        </ul>
      </aside>
      <ul>
        {items.map((boardItem) => (
          // eslint-disable-next-line
          <AnnouncementItem key={boardItem.id} {...boardItem} />
        ))}
      </ul>
    </article>
  );
};
export default AnnouncementList;
