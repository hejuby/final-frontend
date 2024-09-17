import styles from "./layout.module.scss";

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className={styles.title}>커뮤니티</h2>
      {children}
    </>
  );
};

export default CommunityLayout;
