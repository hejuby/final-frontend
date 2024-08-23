import SideNav from "@/components/Board/SideNav";
import Title from "@/components/Board/Title";
import CategoryTab from "@/components/CategoryTab";
import ListItem, { CommunityItemProps } from "@/components/Board/ListItem";
import Pagination from "@/components/Pagination";
import styles from "./page.module.scss";

const BOARD_LIST: CommunityItemProps[] = [
  {
    boardType: "community",
    id: 1,
    userId: 123,
    userNickname: "삶은감자",
    categoryId: 1,
    title: "제목을 뭐라고 하면 좋을까 이런 거 정말 못해",
    preview:
      "요즘은 신청하면 대부분 선정이 되더라고요. 그래서 체험단 포스팅을 많이 썼는데 언제부터가 다 거기서 거기, 틀에 박힌 내용인 것 같아 고민이에요. 다 결이 비슿한 느낌이랄까요? 나만의 감성은 지키면서 종종 독창성 있는 포스팅을 발행해야 하는데 말이죠ㅠㅠ",
    date: "2024-08-07-23-55-17",
    viewCount: 3712,
    commentCount: 21,
  },
];

const tabs = [
  { id: "que", label: "질문하기" },
  { id: "nohawoo", label: "노하우" },
  { id: "3", label: "동행" },
];

const Community = () => {
  return (
    <main className={styles.main}>
      <SideNav />
      <section className={styles.section}>
        <Title />
        <CategoryTab tabs={tabs} />
        <ul>
          {BOARD_LIST.map((boardItem) => (
            <li key={boardItem.id}>
              {/* eslint-disable-next-line */}
              <ListItem {...boardItem} />
            </li>
          ))}
        </ul>
        <Pagination chunkSize={10} totalPages={20} />
      </section>
    </main>
  );
};

export default Community;
