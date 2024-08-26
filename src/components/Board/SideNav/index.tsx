import Link from "next/link";
import { BoardType, BOARD_LIST } from "@/@types/board";
import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

interface SideNavProps {
  boardType: BoardType;
}

const link = ms(styles, "nav__link");

const SideNav = ({ boardType }: SideNavProps) => {
  return (
    <nav className={styles.nav}>
      <p className={styles.nav__title}>게시판</p>
      <ul className={styles.nav__list}>
        {BOARD_LIST.map((board) => {
          const href = `/${board.boardType}`;

          return (
            <li
              key={board.boardId}
              className={link(boardType === board.boardType && "--active")}
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
