"use client";

import { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDialog from "@/hooks/useDialog";
import { BOARD_LIST, BoardType, CATEGORY_LIST } from "@/@types/board";
import CategoryTab from "@/components/CategoryTab";
import TitleInput from "../TitleInput";
import PostControlButtons from "../PostControlButtons";
import styles from "./index.module.scss";

const Editor = dynamic(() => import("@/components/Editor"), {
  loading: () => <div className={styles.skeleton} />,
  ssr: false,
});

interface PostFormProps {
  pathname: BoardType;
  postId?: string;
  category?: string;
  title?: string;
  content?: string;
  isEdit?: boolean;
}

const PostForm = ({
  pathname,
  postId,
  category,
  title,
  content,
  isEdit = false,
}: PostFormProps) => {
  const [formCategory, setFormCategory] = useState<string | null>(
    category ?? null,
  );
  const [formContent, setFormContent] = useState<string>(content ?? "");
  const { alert } = useDialog();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (post: FormData) => {
      return isEdit
        ? axios.patch(
            `https://g6-server.dainreview.kr/api/post/${pathname}/${postId}`,
            post,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            },
          )
        : axios.post(
            `https://g6-server.dainreview.kr/api/post/${pathname}`,
            post,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            },
          );
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formTitle = (event.target as HTMLFormElement).formTitle.value;
    if (!formCategory || !formTitle.length || !formContent.length) {
      await alert("필수 항목을 모두 입력해 주세요.");
      return;
    }

    const formData = new FormData();
    const data: Record<string, string> = {
      title: formTitle,
      content: formContent,
    };
    if (!isEdit) {
      data["categoryType"] =
        BOARD_LIST.find((board) => board.boardType === pathname)?.boardCode ??
        "";
    }
    if (pathname === "communities") {
      data["communityType"] = formCategory;
    }
    if (pathname === "follows") {
      data["followType"] = formCategory;
    }
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      }),
    );

    mutate(formData);
  };

  useEffect(() => {
    if (!isError) {
      return;
    }
    const alertError = async () => {
      await alert("게시글 작성에 실패했습니다!");
    };
    alertError();
  }, [isError]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: [pathname], refetchType: "all" });
    router.push(`/${pathname}`);
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <section className={styles.category}>
          <CategoryTab
            tabs={CATEGORY_LIST[pathname].map((category) => {
              const { categoryType: id, categoryName: label } = category;
              return { id, label };
            })}
            activeTabId={formCategory ?? undefined}
            handleSelect={(id) => {
              setFormCategory(id);
            }}
            handleDeselect={() => {
              setFormCategory(null);
            }}
          />
        </section>
        <TitleInput defaultValue={title} />
        <Editor
          initialData={formContent}
          placeholder="회원님들과 함께 나누고 싶은 글을 마음껏 작성해 보세요!"
          setContent={setFormContent}
        />
        <PostControlButtons disabled={isPending} />
      </form>
    </>
  );
};

export default PostForm;
