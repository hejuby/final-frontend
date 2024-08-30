"use client";

import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";

interface CountItem {
  title: string;
  count: number;
}

interface CountsBoxProps {
  countItems: CountItem[];
}

const CountBox: FC<CountsBoxProps> = ({ countItems }) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {!isTablet && <h3 className={styles["sub-title"]}>나의 활동</h3>}
      <ul className={styles.count__list}>
        {countItems.map((item, index) => (
          <li
            // eslint-disable-next-line
            key={index}
            className={styles.count__item}
          >
            <span className={styles.title}>{item.title}</span>
            <span className={styles.count}>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountBox;
