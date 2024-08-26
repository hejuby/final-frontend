import { notFound } from "next/navigation";
import SideNav from "@/components/Board/SideNav";
import { BoardType, BoardSchema } from "@/@types/board";
import styles from "./layout.module.scss";

const BoardLayout = ({
  params,
  children,
}: {
  params: { boardType: BoardType };
  children: React.ReactNode;
}) => {
  if (!BoardSchema.safeParse(params.boardType).success) {
    notFound();
  }

  return (
    <section className={styles.layout}>
      <SideNav boardType={params.boardType} />
      <article className={styles.page}>{children}</article>
    </section>
  );
};

export default BoardLayout;
