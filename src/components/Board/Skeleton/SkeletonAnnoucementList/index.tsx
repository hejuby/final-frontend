import AnnoucementListTop from "../../AnnouncementList/AnnouncementListTop";
import styles from "./index.module.scss";

const SkeletonAnnoucementList = () => {
  return (
    <article className={styles.skeleton}>
      <AnnoucementListTop />
      <ul>
        {Array.from({ length: 10 }, (_, i) => i).map((num) => (
          <li key={num}>
            <section className={styles.skeleton__item} />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SkeletonAnnoucementList;
