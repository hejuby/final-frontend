import styles from "./index.module.scss";

const MobileCommentCount = ({ count }: { count: number }) => {
  return (
    <article className={styles.wrapper}>
      <p>댓글&nbsp;</p>
      <p className={styles.count}>{count}</p>
      <p>개</p>
    </article>
  );
};

export default MobileCommentCount;
