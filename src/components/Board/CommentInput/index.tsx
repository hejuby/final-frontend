"use client";

import { useState } from "react";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const CommentInput = ({
  id = "comment",
  value = "",
}: {
  id?: string;
  value?: string;
}) => {
  const [comment, setComment] = useState<string>(value);

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
        defaultValue={value}
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <Button type="submit" padding="20px">
        등록
      </Button>
    </form>
  );
};

export default CommentInput;
