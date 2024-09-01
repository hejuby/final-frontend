import Search from "@/components/Board/Search";
import CategoryTab from "@/components/CategoryTab";
import PostButton from "@/components/Board/PostButton";
import PostDivider from "@/components/Board/PostDivider";
import { CommunityItemProps } from "@/components/Board/ListItem";
import List from "@/components/Board/List";
import Pagination from "@/components/Pagination";
import { CATEGORY_LIST } from "@/@types/board";
import mockData from "@/assets/mockData.json";
import styles from "./page.module.scss";

const Board = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const data = mockData.community as CommunityItemProps[];

  return (
    <>
      <section className={styles.control}>
        <nav className={styles.search}>
          <Search />
          <CategoryTab
            tabs={CATEGORY_LIST.community.map((category) => {
              const { categoryType: id, categoryName: label } = category;
              return { id, label };
            })}
          />
        </nav>
        <PostButton />
      </section>
      <PostDivider />
      <section className={styles.list}>
        <List
          items={data.slice(
            10 * (Number(searchParams.page || 1) - 1),
            10 * Number(searchParams.page || 1),
          )}
        />
        <Pagination
          pathname="/community"
          searchParams={searchParams}
          chunkSize={10}
          totalPages={Math.ceil(data.length / 10)}
        />
      </section>
    </>
  );
};

export default Board;
