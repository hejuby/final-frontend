import styles from "./layout.module.scss";

const AnnouncementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className={styles.title}>맞팔/서이추</h2>
      {children}
    </>
  );
};

export default AnnouncementLayout;
