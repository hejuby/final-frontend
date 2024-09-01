import SideNav from "@/components/Board/SideNav";
import styles from "./layout.module.scss";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={styles.layout}>
      <SideNav />
      <article className={styles.page}>{children}</article>
    </section>
  );
};

export default BoardLayout;
