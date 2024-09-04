"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./index.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isMainPage =
    pathname === "/" || pathname === "/search" || pathname === "/products";

  return (
    <main
      className={`${styles.container} ${isMainPage ? styles["main-page"] : ""}`}
    >
      {children}
    </main>
  );
};

export default Layout;
