import styles from "./index.module.scss";

const Loading = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Loading;
