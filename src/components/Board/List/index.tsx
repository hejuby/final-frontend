import ListItem, { CommunityItemProps } from "../ListItem";
import styles from "./index.module.scss";

interface ListProps {
  items: CommunityItemProps[];
}

const List = ({ items }: ListProps) => {
  return (
    <ul className={styles.list}>
      {items.map((boardItem) => (
        // eslint-disable-next-line
        <ListItem key={boardItem.id} {...boardItem} />
      ))}
    </ul>
  );
};
export default List;
