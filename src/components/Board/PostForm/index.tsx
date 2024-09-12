"use client";

import { FormEvent, useState } from "react";
import useDialog from "@/hooks/useDialog";
import CategoryTab from "@/components/CategoryTab";
import TitleInput from "../TitleInput";
import Editor from "@/components/Editor";
import PostControlButtons from "../PostControlButtons";
import { BoardType, CATEGORY_LIST } from "@/@types/board";
import styles from "./index.module.scss";

interface PostFormProps {
  pathname: BoardType;
  category?: string;
  title?: string;
  content?: string;
}

const PostForm = ({ pathname, category, title, content }: PostFormProps) => {
  const [formCategory, setFormCategory] = useState<string | null>(
    category ?? null,
  );
  const [formContent, setFormContent] = useState<string>(content ?? "");
  const { alert } = useDialog();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formTitle = (event.target as HTMLFormElement).formTitle.value;
    if (!formCategory || !formTitle.length || !formContent.length) {
      await alert("필수 항목을 모두 입력해 주세요.");
      return;
    }
    console.log(formCategory, formTitle, formContent);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <PostControlButtons />
    </form>
  );
};

export default PostForm;
