"use client";

import { usePathname } from "next/navigation";
import { BOARD_LIST } from "@/@types/board";
import styles from "./index.module.scss";

const Title = () => {
  const pathname = usePathname();

  return (
    <h2 className={styles.h2}>
      {
        BOARD_LIST.find(
          (board) => board.boardType === pathname.replace("/board/", ""),
        )?.boardName
      }
    </h2>
  );
};

export default Title;
