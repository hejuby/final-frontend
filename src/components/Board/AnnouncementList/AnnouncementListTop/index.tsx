import styles from "./index.module.scss";

const AnnoucementListTop = () => {
  return (
    <aside>
      <ul className={styles.top}>
        <li className={styles.top__title}>
          <p>제목</p>
        </li>
        <li className={styles.top__date}>
          <p>등록일</p>
        </li>
        <li className={styles.top__views}>
          <p>조회수</p>
        </li>
      </ul>
    </aside>
  );
};

export default AnnoucementListTop;
