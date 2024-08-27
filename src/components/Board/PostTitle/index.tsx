import Link from "next/link";
import { CATEGORY_LIST } from "@/@types/board";
import formatDate from "@/utils/formatDate";
import IconProfile from "@/assets/icons/icon-profile.svg";
import IconComment from "@/assets/icons/icon-comment.svg";
import Category from "../Category";
import EditDropdown from "../EditDropdown";
import { CommunityItemProps } from "../ListItem";
import styles from "./index.module.scss";

const PostTitle = ({ post }: { post: CommunityItemProps }) => {
  const {
    boardType,
    id,
    userId,
    userNickname,
    categoryId,
    title,
    date,
    viewCount,
    commentCount,
  } = post;
  const category = CATEGORY_LIST[boardType].find(
    (item) => item.categoryId === categoryId,
  );

  if (!category) {
    return null;
  }

  return (
    <section className={styles.title}>
      <aside className={styles.title__top}>
        <Category
          pageType="post"
          boardType={boardType}
          categoryType={category.categoryType}
        >
          {category.categoryName}
        </Category>
        <EditDropdown type="post" boardType={boardType} id={id} />
      </aside>
      <h3 className={styles.title__text}>{title}</h3>
      <ul className={styles.title__info}>
        <li className={styles["info-group"]}>
          <Link href={`/profile/${userId}`} className={styles.profile}>
            <IconProfile viewBox="0 0 36 36" />
            <p>{userNickname}</p>
          </Link>
          <p>{formatDate(date, "MDMH")}</p>
        </li>
        <li className={styles["info-group"]}>
          <p>{`조회 ${viewCount.toLocaleString()}`}</p>
          <div className={styles.comment}>
            <IconComment viewBox="0 0 24 24" />
            <p>{commentCount.toLocaleString()}</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default PostTitle;
