import Title from "@/components/Board/Title";
import Search from "@/components/Board/Search";
import CategoryTab from "@/components/CategoryTab";
import PostButton from "@/components/Board/PostButton";
import Line from "@/components/Line";
import { CommunityItemProps } from "@/components/Board/ListItem";
import List from "@/components/Board/List";
import Pagination from "@/components/Pagination";
import { BoardType, CATEGORY_LIST } from "@/@types/board";
import mockData from "@/assets/mockData.json";
import styles from "./page.module.scss";

const Board = async ({
  params,
  searchParams,
}: {
  params: { boardType: BoardType };
  searchParams: Record<string, string>;
}) => {
  const data = mockData[params.boardType] as CommunityItemProps[];

  return (
    <>
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
      <List
        items={data.slice(
          10 * (Number(searchParams.page || 1) - 1),
          10 * Number(searchParams.page || 1),
        )}
        boardType={params.boardType}
      />
      <Pagination
        pathname={`/${params.boardType}`}
        searchParams={searchParams}
        chunkSize={10}
        totalPages={Math.ceil(data.length / 10)}
      />
    </>
  );
};

export default Board;
