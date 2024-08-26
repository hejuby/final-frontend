import { BoardType, CategoryType } from "@/@types/board";
import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

interface CategoryProps {
  children: React.ReactNode;
  pageType: "list" | "post";
  boardType: BoardType;
  categoryType: CategoryType;
}

const tag = ms(styles, "tag");

const Category = ({
  children,
  pageType,
  boardType,
  categoryType,
}: CategoryProps) => {
  return (
    <p
      className={tag(
        `--page-${pageType}`,
        `--board-${boardType}--category-${categoryType}`,
      )}
    >
      {children}
    </p>
  );
};

export default Category;
