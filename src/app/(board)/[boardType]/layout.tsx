import SideNav from "@/components/Board/SideNav";
import { BoardType } from "@/@types/board";
import styles from "./layout.module.scss";

const BoardLayout = ({
  params,
  children,
}: {
  params: { boardType: BoardType };
  children: React.ReactNode;
}) => {
  return (
    <section className={styles.layout}>
      <SideNav boardType={params.boardType} />
      {children}
    </section>
  );
};

export default BoardLayout;
