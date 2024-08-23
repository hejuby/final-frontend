"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

const BOARD_PATH = [
  { pathname: "announcement", text: "공지사항" },
  { pathname: "community", text: "커뮤니티" },
  { pathname: "follows", text: "맞팔/서이추" },
];

const link = ms(styles, "nav__link");

const SideNav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <p className={styles.nav__title}>게시판</p>
      <ul className={styles.nav__list}>
        {BOARD_PATH.map((path) => {
          const href = `/board/${path.pathname}`;

          return (
            <li
              key={path.pathname}
              className={link(pathname === href && "--active")}
            >
              <Link href={href}>{path.text}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNav;
