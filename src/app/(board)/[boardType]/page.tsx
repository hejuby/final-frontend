import { promises as fs } from "fs";
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

  const response = await fs.readFile(
    process.cwd().toString().concat("/public/mockData.json"),
    "utf8",
  );
  const data = JSON.parse(response) as Record<BoardType, CommunityItemProps[]>;
  const items = data[params.boardType];

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
        {items
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
        totalPages={Math.ceil(items.length / 10)}
      />
    </article>
  );
};

export default Board;
