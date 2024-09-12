import Search from "@/components/Board/Search";
// import PostButton from "@/components/Board/PostButton";
import PostDivider from "@/components/Board/PostDivider";
import { CommunityItemProps } from "@/components/Board/ListItem";
import AnnouncementList from "@/components/Board/AnnouncementList";
import Pagination from "@/components/Pagination";
import mockData from "@/assets/mockData.json";
import styles from "./page.module.scss";

const Board = async ({ searchParams }: { searchParams: { page: string } }) => {
  const data = mockData.announcement as CommunityItemProps[];

  return (
    <>
      <section className={styles.control}>
        <nav className={styles.search}>
          <Search pathname="announcement" searchParams={searchParams} />
        </nav>
        {/* <PostButton /> */}
      </section>
      <PostDivider />
      <section className={styles.list}>
        <AnnouncementList
          items={data.slice(
            10 * (Number(searchParams.page || 1) - 1),
            10 * Number(searchParams.page || 1),
          )}
        />
        <Pagination
          pathname="/announcement"
          searchParams={searchParams}
          chunkSize={10}
          totalPages={Math.ceil(data.length / 10)}
        />
      </section>
    </>
  );
};

export default Board;
