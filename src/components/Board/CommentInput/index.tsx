"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDialog from "@/hooks/useDialog";
import Button from "@/components/Button";
import styles from "./index.module.scss";

interface CommentInputProps {
  postId: number;
  parentId?: number | null;
  commentId?: number;
  id?: string;
  value?: string;
}

const CommentInput = ({
  postId,
  parentId = null,
  commentId,
  id = "comment",
  value = "",
}: CommentInputProps) => {
  const [comment, setComment] = useState<string>(value);
  const { alert } = useDialog();
  const queryClient = useQueryClient();
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (comment: { content: string; parentId?: number | null }) => {
      return commentId
        ? axios.patch(
            `https://g6-server.dainreview.kr/api/post/${postId}/comments/${commentId}`,
            comment,
            {
              withCredentials: true,
            },
          )
        : axios.post(
            `https://g6-server.dainreview.kr/api/post/${postId}/comments`,
            comment,
            {
              withCredentials: true,
            },
          );
    },
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    queryClient.resetQueries({ queryKey: ["comments", postId.toString()] });
    setComment("");
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    const alertError = async () => {
      await alert("댓글 등록에 실패했습니다!");
    };
    alertError();
  }, [isError]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutate({ content: comment, parentId });
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
      <Button type="submit" padding="20px" disabled={isPending}>
        등록
      </Button>
    </form>
  );
};

export default CommentInput;
