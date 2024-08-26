import { BoardType } from "@/@types/board";
import AnnouncementItem from "../AnnouncementItem";
import ListItem, { CommunityItemProps } from "../ListItem";

interface ListProps {
  items: CommunityItemProps[];
  boardType: BoardType;
}

const List = ({ items, boardType }: ListProps) => {
  return (
    <ul>
      {items.map((boardItem) =>
        boardType === "announcement" ? (
          // eslint-disable-next-line
          <AnnouncementItem key={boardItem.id} {...boardItem} />
        ) : (
          // eslint-disable-next-line
          <ListItem key={boardItem.id} {...boardItem} />
        ),
      )}
    </ul>
  );
};
export default List;
