import { BoardPost, BoardType, CATEGORY_LIST } from "@/@types/board";
import useUserStore from "@/store/useUserStore";
import formatDate from "@/utils/formatDate";
import IconProfile from "@/assets/icons/icon-profile.svg";
import IconComment from "@/assets/icons/icon-comment.svg";
import Category from "../Category";
import EditDropdown from "../EditDropdown";
import styles from "./index.module.scss";

interface PostTitleProps {
  post: BoardPost;
}

const PostTitle = ({ post }: PostTitleProps) => {
  const {
    id,
    authorNickName,
    authorProfileImageUrl,
    title,
    noticeBoardType,
    categoryType: categoryName,
    attachedFileUrls,
    createdAt,
    viewCount,
    commentCount,
  } = post;
  const name = useUserStore((state) => state.name);
  const isAuthor = authorNickName === name;
  const boardType: BoardType =
    noticeBoardType === "커뮤니티" ? "communities" : "follows";
  const category = CATEGORY_LIST[boardType].find(
    (categoryItem) => categoryItem.categoryName === categoryName,
  );
  const { categoryType } = category || CATEGORY_LIST[boardType][0];

  return (
    <section className={styles.title}>
      <aside className={styles.title__top}>
        <Category
          pageType="post"
          boardType={boardType}
          categoryType={categoryType}
        >
          {categoryName}
        </Category>
        {isAuthor && (
          <EditDropdown type="post" boardType={boardType} postId={id} />
        )}
      </aside>
      <h3 className={styles.title__text}>{title}</h3>
      <ul className={styles.title__info}>
        <li className={styles["info-group"]}>
          <section className={styles.profile}>
            {authorProfileImageUrl ? (
              <img
                src={authorProfileImageUrl}
                width="24px"
                height="24px"
                alt="작성자 프로필"
                sizes="(max-width: 1024px) 20px, 20px"
              />
            ) : (
              <IconProfile viewBox="0 0 36 36" />
            )}
            <p>{authorNickName}</p>
          </section>
          <p>{formatDate(createdAt, "MDMH")}</p>
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
