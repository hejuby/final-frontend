"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import useUserStore from "@/store/useUserStore";
import styles from "./index.module.scss";

const PRIVATE_PATH = [/\/communities/, /\/follows/];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = useUserStore((state) => state.isLogin);
  const setName = useUserStore((state) => state.setName);
  const setProfileImageUrl = useUserStore((state) => state.setProfileImageUrl);
  const setIsInfluencer = useUserStore((state) => state.setIsInfluencer);
  const isMainPage =
    pathname === "/" ||
    pathname === "/search" ||
    pathname.startsWith("/products");

  if (
    !isLogin &&
    PRIVATE_PATH.reduce((acc, cur) => acc || cur.test(pathname), false)
  ) {
    router.push("/auth/login");
  }

  useEffect(() => {
    if (!isLogin) {
      return;
    }
    axios
      .get("https://g6-server.dainreview.kr/api/user/header-info", {
        withCredentials: true,
      })
      .then(
        (response: {
          data: {
            name: string;
            profileImageUrl: string;
            isInfluencer: boolean;
          };
        }) => response.data,
      )
      .then((data) => {
        setName(data.name);
        setProfileImageUrl(data.profileImageUrl);
        setIsInfluencer(data.isInfluencer);
      });
  }, [isLogin]);

  return (
    <main
      className={`${styles.container} ${isMainPage ? styles["main-page"] : ""}`}
    >
      {children}
    </main>
  );
};

export default Layout;
