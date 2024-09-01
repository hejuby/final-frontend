"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOARD_LIST } from "@/@types/board";
import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

const nav = ms(styles, "nav");
const link = ms(styles, "nav__link");

const SideNav = () => {
  const pathname = usePathname();
  const [isPost, setIsPost] = useState<boolean>(false);

  useEffect(() => {
    if (pathname.split("/").length > 2) {
      setIsPost(true);
    } else {
      setIsPost(false);
    }
  }, [pathname, setIsPost]);

  return (
    <nav className={isPost ? nav("--post") : nav()}>
      <p className={styles.nav__title}>게시판</p>
      <ul className={styles.nav__list}>
        {BOARD_LIST.map((board) => {
          const href = `/${board.boardType}`;

          return (
            <li
              key={board.boardId}
              className={link(
                pathname.split("/")[1] === board.boardType && "--active",
              )}
            >
              <Link href={href}>{board.boardName}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNav;
