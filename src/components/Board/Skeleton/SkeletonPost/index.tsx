import styles from "./index.module.scss";

const SkeletonPost = () => {
  return (
    <article className={styles.post}>
      <section className={styles.category} />
      <section className={styles.title} />
      <section className={styles.info} />
      <section className={styles.content} />
    </article>
  );
};

export default SkeletonPost;
