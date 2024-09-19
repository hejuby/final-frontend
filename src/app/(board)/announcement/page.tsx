import { Suspense } from "react";
import Search from "@/components/Board/Search";
// import PostButton from "@/components/Board/PostButton";
import PostDivider from "@/components/Board/PostDivider";
import AnnouncementList from "@/components/Board/AnnouncementList";
import SkeletonAnnoucementList from "@/components/Board/Skeleton/SkeletonAnnoucementList";
import styles from "./page.module.scss";

const Board = ({
  searchParams,
}: {
  searchParams: { page: string; keyword: string };
}) => {
  return (
    <>
      <section className={styles.control}>
        <nav className={styles.search}>
          <Search pathname="announcement" searchParams={searchParams} />
        </nav>
        {/* <PostButton /> */}
      </section>
      <PostDivider />
      <Suspense fallback={<SkeletonAnnoucementList />}>
        <AnnouncementList searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default Board;
