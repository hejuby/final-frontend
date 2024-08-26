import Link from "next/link";
import formatDate from "@/utils/formatDate";
import IconProfile from "@/assets/icons/icon-profile.svg";
import IconComment from "@/assets/icons/icon-comment.svg";
import { BoardType, CategoryId, CATEGORY_LIST } from "@/@types/board";
import Category from "../Category";
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

const ListItem = ({
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
  const category = CATEGORY_LIST[boardType].find(
    (categoryItem) => categoryItem.categoryId === categoryId,
  );
  const { categoryType, categoryName } =
    category || CATEGORY_LIST[boardType][0];

  return (
    <li className={styles.li}>
      <Category
        pageType="list"
        boardType={boardType}
        categoryType={categoryType}
      >
        {categoryName}
      </Category>
      <Link href={`/${boardType}/${id}`} className={styles.li__link}>
        <h3 className={styles.li__title}>{title}</h3>
        <p className={styles.li__preview}>{preview}</p>
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
    </li>
  );
};

export default ListItem;
