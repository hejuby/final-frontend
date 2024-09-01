import Line from "@/components/Line";
import styles from "./index.module.scss";

const PostDivider = ({ marginBottom }: { marginBottom?: string }) => {
  return (
    <section className={styles.divider} style={{ marginBottom }}>
      <Line />
    </section>
  );
};

export default PostDivider;
