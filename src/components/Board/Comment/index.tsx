import Link from "next/link";
import formatDate from "@/utils/formatDate";
import IconProfile from "@/assets/icons/icon-profile.svg";
import EditDropdown from "../EditDropdown";
import styles from "./index.module.scss";

interface CommentProps {
  text: string;
  id: number;
  userId: string;
  userNickname: string;
  date: string;
}

const Comment = ({ text, id, userId, userNickname, date }: CommentProps) => {
  return (
    <article className={styles.comment}>
      <Link href={`/profile/${userId}`}>
        <figure className={styles.comment__profile}>
          <IconProfile viewBox="0 0 36 36" />
        </figure>
      </Link>
      <section>
        <aside className={styles.comment__top}>
          <div className={styles.info}>
            <Link href={`/profile/${userId}`}>
              <p className={styles.info__username}>{userNickname}</p>
            </Link>
            <p className={styles.info__date}>{formatDate(date, "MDMH")}</p>
          </div>
          <EditDropdown type="comment" id={id} />
        </aside>
        <p className={styles.comment__text}>{text}</p>
        <button className={styles["reply-button"]} type="button">
          답글 쓰기
        </button>
      </section>
    </article>
  );
};

export default Comment;
