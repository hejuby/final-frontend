import PostDivider from "@/components/Board/PostDivider";
import CategoryTab from "@/components/CategoryTab";
import TitleInput from "@/components/Board/TitleInput";
import PostControlButtons from "@/components/Board/PostControlButtons";
import { CATEGORY_LIST } from "@/@types/board";
import styles from "./page.module.scss";

const CommunityCreate = () => {
  return (
    <>
      <PostDivider marginBottom="20px" />
      <section className={styles.category}>
        <CategoryTab
          tabs={CATEGORY_LIST.community.map((category) => {
            const { categoryType: id, categoryName: label } = category;
            return { id, label };
          })}
        />
      </section>
      <TitleInput />
      <PostControlButtons
        handleClick={async () => {
          "use server";
        }}
      />
    </>
  );
};

export default CommunityCreate;
