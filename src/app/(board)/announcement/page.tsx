import axios from "axios";
import createRequestParamsURI from "@/utils/createRequestParamsURI";
import Search from "@/components/Board/Search";
// import PostButton from "@/components/Board/PostButton";
import PostDivider from "@/components/Board/PostDivider";
import { BoardResponse } from "@/@types/board";
import AnnouncementList from "@/components/Board/AnnouncementList";
import Pagination from "@/components/Pagination";
import styles from "./page.module.scss";

const Board = async ({
  searchParams,
}: {
  searchParams: { page: string; keyword: string };
}) => {
  const data: BoardResponse = await axios.get(
    `https://g6-server.dainreview.kr/api/post/notices${createRequestParamsURI(
      searchParams,
    )}`,
  );
  const { content, totalPages } = data.data;

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
        <AnnouncementList items={content} />
        <Pagination
          pathname="/announcement"
          searchParams={searchParams}
          chunkSize={10}
          totalPages={totalPages}
        />
      </section>
    </>
  );
};

export default Board;
