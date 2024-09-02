"use client";

import { useState } from "react";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import IconProfile from "@/assets/icons/icon-profile.svg";
import EditDropdown from "../EditDropdown";
import CommentInput from "../CommentInput";
import styles from "./index.module.scss";

interface CommentProps {
  text: string;
  id: number;
  userId: string;
  userNickname: string;
  date: string;
}

const Comment = ({ text, id, userId, userNickname, date }: CommentProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <article className={styles.comment}>
      <Link href={`/profile/${userId}`}>
        <figure className={styles.comment__profile}>
          <IconProfile viewBox="0 0 36 36" />
        </figure>
      </Link>
      <section className={styles.comment__content}>
        <aside className={styles.comment__top}>
          <div className={styles.info}>
            <Link href={`/profile/${userId}`}>
              <p className={styles.info__username}>{userNickname}</p>
            </Link>
            <p className={styles.info__date}>{formatDate(date, "MDMH")}</p>
          </div>
          <EditDropdown
            type="comment"
            id={id}
            commentEdit={() => {
              setIsEdit(true);
            }}
          />
        </aside>
        {isEdit ? (
          <CommentInput id={id.toString()} value={text} />
        ) : (
          <p className={styles.comment__text}>{text}</p>
        )}
        <button className={styles["reply-button"]} type="button">
          답글 쓰기
        </button>
      </section>
    </article>
  );
};

export default Comment;
