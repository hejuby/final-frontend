import axios from "axios";
import createRequestParamsURI from "@/utils/createRequestParamsURI";
import { BoardResponse } from "@/@types/board";
import Pagination from "@/components/Pagination";
import AnnoucementListTop from "./AnnouncementListTop";
import AnnouncementItem from "../AnnouncementItem";
import styles from "./index.module.scss";

interface ListProps {
  searchParams: { page: string; keyword: string };
}

const AnnouncementList = async ({ searchParams }: ListProps) => {
  const data: BoardResponse = await axios.get(
    `https://g6-server.dainreview.kr/api/post/notices${createRequestParamsURI(
      searchParams,
    )}`,
  );

  if (!data) {
    return null;
  }

  const { content, totalPages } = data.data;

  return (
    <section className={styles.wrapper}>
      <article className={styles.list}>
        <AnnoucementListTop />
        <ul>
          {content.map((boardItem) => (
            // eslint-disable-next-line
            <AnnouncementItem key={boardItem.id} {...boardItem} />
          ))}
        </ul>
      </article>
      <Pagination
        pathname="/announcement"
        searchParams={searchParams}
        chunkSize={10}
        totalPages={totalPages}
      />
    </section>
  );
};
export default AnnouncementList;
