import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

interface TableItemProps {
  isIndex: boolean;
  children: number | string | React.ReactNode;
}

const item = ms(styles, "item");

const TableItem = ({ isIndex, children }: TableItemProps) => {
  return (
    <li className={isIndex ? item("--index") : item()}>
      {typeof children === "number" || typeof children === "string" ? (
        <p>{children}</p>
      ) : (
        children
      )}
    </li>
  );
};

interface TableProps {
  head: string[];
  body: ({ index: number; isActive?: boolean } & Record<
    string,
    number | string | React.ReactNode
  >)[];
  order: string[];
}

const line = ms(styles, "line");

const Table = ({ head, body, order }: TableProps) => {
  return (
    <article className={styles.table}>
      <ul className={line("--head")}>
        {head.map((headItem, index) => (
          <li key={headItem} className={index === 0 ? item("--index") : item()}>
            <p>{headItem}</p>
          </li>
        ))}
      </ul>
      {body.map((bodyItem) => (
        <ul
          key={bodyItem.index}
          className={bodyItem.isActive ? line("--active") : line()}
        >
          {order.map((orderItem) => (
            <TableItem key={orderItem} isIndex={orderItem === "index"}>
              {bodyItem[orderItem]}
            </TableItem>
          ))}
        </ul>
      ))}
    </article>
  );
};

export default Table;
