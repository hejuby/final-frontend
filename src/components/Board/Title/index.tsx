import { BoardType, BOARD_LIST } from "@/@types/board";
import styles from "./index.module.scss";

interface TitleProps {
  boardType: BoardType;
}

const Title = ({ boardType }: TitleProps) => {
  return (
    <h2 className={styles.h2}>
      {BOARD_LIST.find((board) => board.boardType === boardType)?.boardName}
    </h2>
  );
};

export default Title;
