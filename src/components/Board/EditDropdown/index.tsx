"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDialog from "@/hooks/useDialog";
import { BoardType } from "@/@types/board";
import IconKebab from "@/assets/icons/icon-kebab.svg";
import IconEdit from "@/assets/icons/icon-edit.svg";
import IconDelete from "@/assets/icons/icon-delete.svg";
import styles from "./index.module.scss";

interface EditDropdownProps {
  type: "post" | "comment";
  postId: number;
  boardType?: BoardType;
  commentId?: number;
  commentEdit?: () => void;
  commentDelete?: () => void;
}

const EditDropdown = ({
  type,
  postId,
  boardType,
  commentId,
  commentEdit,
  commentDelete,
}: EditDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { confirm, alert } = useDialog();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => {
      return type === "post"
        ? axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${boardType}/${postId}`,
            {
              withCredentials: true,
            },
          )
        : axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${postId}/comments/${commentId}`,
            {
              withCredentials: true,
            },
          );
    },
  });

  useEffect(() => {
    window.addEventListener("click", () => {
      setIsOpen(false);
    });
    return () => {
      window.removeEventListener("click", () => {
        setIsOpen(false);
      });
    };
  }, []);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    if (type === "comment") {
      if (commentId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", commentId.toString()],
        });
      }
      if (commentDelete) {
        commentDelete();
      }
    }
    if (type === "post") {
      queryClient.invalidateQueries({
        queryKey: [boardType],
        refetchType: "all",
      });
      router.push(`/${boardType}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    const alertError = async () => {
      await alert("삭제에 실패했습니다!");
    };
    alertError();
  }, [isError]);

  if (type === "post" && !boardType) {
    return null;
  }

  return (
    <nav className={styles.wrapper}>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-label="수정 삭제 버튼"
      >
        <IconKebab viewBox="0 0 24 24" />
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          <li>
            {type === "post" ? (
              <Link
                href={`/${boardType}/${postId}/edit`}
                className={styles.dropdown__button}
              >
                <p>수정하기</p>
                <IconEdit viewBox="0 0 24 24" />
              </Link>
            ) : (
              <button
                type="button"
                className={styles.dropdown__button}
                onClick={() => {
                  if (!commentEdit) {
                    return;
                  }
                  commentEdit();
                  setIsOpen(false);
                }}
              >
                <p>수정하기</p>
                <IconEdit viewBox="0 0 24 24" />
              </button>
            )}
          </li>
          <li>
            <button
              type="button"
              className={styles.dropdown__button}
              onClick={async () => {
                const confirmed = await confirm(
                  "삭제 시 복구가 불가능해요!",
                  "그래도 삭제하시겠어요?",
                );

                if (confirmed) {
                  mutate();
                  setIsOpen(false);
                }
              }}
            >
              <p className={styles["delete-text"]}>삭제하기</p>
              <IconDelete viewBox="0 0 24 24" />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default EditDropdown;
