import styles from "./layout.module.scss";

const AnnouncementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className={styles.title}>공지사항</h2>
      {children}
    </>
  );
};

export default AnnouncementLayout;
