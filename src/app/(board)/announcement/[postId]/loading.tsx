import PostDivider from "@/components/Board/PostDivider";
import pageStyles from "./page.module.scss";
import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <>
      <PostDivider marginBottom="30px" />
      <section className={pageStyles.content}>
        <section className={styles.title}>
          <div className={styles.title__text} />
          <div className={styles.title__info} />
        </section>
        <section className={styles.content} />
      </section>
    </>
  );
};

export default Loading;
