import Link from "next/link";
import formatDate from "@/utils/formatDate";
import IconProfile from "@/assets/icons/icon-profile.svg";
import IconComment from "@/assets/icons/icon-comment.svg";
import { BoardItem, BoardType, CATEGORY_LIST } from "@/@types/board";
import Category from "../Category";
import styles from "./index.module.scss";

const ListItem = ({
  id,
  authorNickName,
  title,
  noticeBoardType,
  categoryType: categoryName,
  createdAt,
  viewCount,
  commentCount,
  contentPreview,
}: BoardItem) => {
  const boardType: BoardType =
    noticeBoardType === "커뮤니티" ? "communities" : "follows";
  const category = CATEGORY_LIST[boardType].find(
    (categoryItem) => categoryItem.categoryName === categoryName,
  );
  const { categoryType } = category || CATEGORY_LIST[boardType][0];

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
        <p className={styles.li__preview}>{contentPreview}</p>
      </Link>
      <section className={styles.section}>
        <ul className={styles.section__list}>
          <li className={styles.section__link}>
            <IconProfile viewBox="0 0 36 36" />
            <p>{authorNickName}</p>
          </li>
          <li>
            <p>{formatDate(createdAt, "YMD")}</p>
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
