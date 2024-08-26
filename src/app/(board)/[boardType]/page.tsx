import { notFound } from "next/navigation";
import { z } from "zod";
import Title from "@/components/Board/Title";
import Search from "@/components/Board/Search";
import CategoryTab from "@/components/CategoryTab";
import PostButton from "@/components/Board/PostButton";
import Line from "@/components/Line";
import ListItem, { CommunityItemProps } from "@/components/Board/ListItem";
import AnnouncementItem from "@/components/Board/AnnouncementItem";
import Pagination from "@/components/Pagination";
import { BoardType, BOARD_TYPE, CATEGORY_LIST } from "@/@types/board";
import styles from "./page.module.scss";

const BoardSchema = z.enum(BOARD_TYPE);

const Board = async ({
  params,
  searchParams,
}: {
  params: { boardType: BoardType };
  searchParams: Record<string, string>;
}) => {
  if (!BoardSchema.safeParse(params.boardType).success) {
    notFound();
  }

  const response = await fetch(
    `http://localhost:3000/api/board/${params.boardType}`,
  );
  const data: CommunityItemProps[] = await response.json();

  return (
    <article className={styles.page}>
      <Title boardType={params.boardType} />
      <section className={styles.control}>
        <nav className={styles.search}>
          <Search />
          <CategoryTab
            tabs={CATEGORY_LIST[params.boardType].map((category) => {
              const { categoryType: id, categoryName: label } = category;
              return { id, label };
            })}
          />
        </nav>
        <PostButton />
      </section>
      <Line />
      <ul>
        {data
          .slice(
            10 * (Number(searchParams.page || 1) - 1),
            10 * Number(searchParams.page || 1),
          )
          .map((boardItem) =>
            params.boardType === "announcement" ? (
              // eslint-disable-next-line
              <AnnouncementItem key={boardItem.id} {...boardItem} />
            ) : (
              // eslint-disable-next-line
              <ListItem key={boardItem.id} {...boardItem} />
            ),
          )}
      </ul>
      <Pagination
        pathname={`/${params.boardType}`}
        searchParams={searchParams}
        chunkSize={10}
        totalPages={Math.ceil(data.length / 10)}
      />
    </article>
  );
};

export default Board;
