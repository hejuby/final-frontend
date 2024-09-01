"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const ManageButtons = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    handleResize();
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.nav}>
      <Button color="outline" full={isMobile}>
        일정확인
      </Button>
      <Button color="solid" full={isMobile}>
        모집종료
      </Button>
    </nav>
  );
};

export default ManageButtons;
