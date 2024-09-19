import styles from "./index.module.scss";

const SkeletonListItem = () => {
  return (
    <article className={styles.item}>
      <section className={styles.category} />
      <section className={styles.title} />
      <section className={styles.preview} />
      <section className={styles.author} />
    </article>
  );
};

export default SkeletonListItem;
