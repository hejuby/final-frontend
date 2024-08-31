import styles from "./layout.module.scss";

const ManageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className={styles.layout}>
      <h2 className={styles.title}>체험단 관리</h2>
      {children}
    </article>
  );
};

export default ManageLayout;
