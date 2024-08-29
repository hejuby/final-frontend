import React, { FC } from "react";
import styles from "./index.module.scss";

interface CountItem {
  title: string;
  count: number;
}

interface CountsBoxProps {
  countItems: CountItem[];
}

const CountBox: FC<CountsBoxProps> = ({ countItems }) => {
  return (
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
  );
};

export default CountBox;
