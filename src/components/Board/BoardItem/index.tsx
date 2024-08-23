import Link from "next/link";
import formatDate from "@/utils/formatDate";
import ms from "@/utils/modifierSelector";
import IconProfile from "@/assets/icons/icon-profile.svg";
import IconComment from "@/assets/icons/icon-comment.svg";
import { BoardType, CategoryList, CategoryId } from "@/@types/board";
import styles from "./index.module.scss";

export interface CommunityItemProps {
  boardType: BoardType;
  id: number;
  userId: number;
  userNickname: string;
  categoryId: CategoryId;
  title: string;
  preview: string;
  date: string;
  viewCount: number;
  commentCount: number;
}

const ac = ms(styles, "article__category");

const BoardItem = ({
  boardType,
  id,
  userId,
  userNickname,
  categoryId,
  title,
  preview,
  date,
  viewCount,
  commentCount,
}: CommunityItemProps) => {
  const category = CategoryList[boardType].find(
    (categoryItem) => categoryItem.categoryId === categoryId,
  );
  const { categoryName, categoryText } = category || CategoryList[boardType][0];

  return (
    <article className={styles.article}>
      <p className={ac(`--board-${boardType}--category-${categoryName}`)}>
        {categoryText}
      </p>
      <Link href={`/board/community/${id}`} className={styles.article__link}>
        <h3 className={styles.article__title}>{title}</h3>
        <p className={styles.article__preview}>{preview}</p>
      </Link>
      <section className={styles.section}>
        <ul className={styles.section__list}>
          <li>
            <Link href={`/profile/${userId}`} className={styles.section__link}>
              <IconProfile viewBox="0 0 36 36" />
              <p>{userNickname}</p>
            </Link>
          </li>
          <li>
            <p>{formatDate(date, "YMD")}</p>
          </li>
        </ul>
        <ul className={styles.section__list}>
          <li>
            <p>{`조회 ${viewCount.toLocaleString()}`}</p>
          </li>
          <li className={styles["section__comment-item"]}>
            <IconComment viewBox="0 0 24 24" />
            <p>{commentCount.toLocaleString()}</p>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default BoardItem;
