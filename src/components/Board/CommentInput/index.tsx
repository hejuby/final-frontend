"use client";

import { useState } from "react";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const CommentInput = ({ id = "comment" }: { id?: string }) => {
  const [comment, setComment] = useState<string>("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(comment);
      }}
      className={styles.comment}
      id={id}
    >
      <textarea
        className={styles.comment__input}
        form={id}
        placeholder="댓글을 남겨보세요"
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <Button type="submit">등록</Button>
    </form>
  );
};

export default CommentInput;
