"use client";

import { useState } from "react";
import Link from "next/link";
import { BoardType } from "@/@types/board";
import IconKebab from "@/assets/icons/icon-kebab.svg";
import IconEdit from "@/assets/icons/icon-edit.svg";
import IconDelete from "@/assets/icons/icon-delete.svg";
import styles from "./index.module.scss";

interface EditDropdownProps {
  type: "post" | "comment";
  boardType?: BoardType;
  id: number;
}

const EditDropdown = ({ type, boardType, id }: EditDropdownProps) => {
  if (type === "post" && !boardType) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.wrapper}>
      <button
        type="button"
        onClick={() => {
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
                href={`/${boardType}/${id}/edit`}
                className={styles.dropdown__button}
              >
                <p>수정하기</p>
                <IconEdit viewBox="0 0 24 24" />
              </Link>
            ) : (
              <button type="button" className={styles.dropdown__button}>
                <p>수정하기</p>
                <IconEdit viewBox="0 0 24 24" />
              </button>
            )}
          </li>
          <li>
            <button type="button" className={styles.dropdown__button}>
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
