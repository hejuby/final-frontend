export type BoardId = "A" | "B" | "C";

export type BoardType = "announcement" | "community" | "follows";

export type BoardName = "공지사항" | "커뮤니티" | "맞팔/서이추";

export type Board = {
  boardId: BoardId;
  boardType: BoardType;
  boardName: BoardName;
};

export const BOARD_LIST: Board[] = [
  { boardId: "A", boardType: "announcement", boardName: "공지사항" },
  { boardId: "B", boardType: "community", boardName: "커뮤니티" },
  { boardId: "C", boardType: "follows", boardName: "맞팔/서이추" },
] as const;

export type CategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type CategoryType =
  | "question"
  | "know-how"
  | "accompany"
  | "blog"
  | "instagram"
  | "youtube"
  | "tictoc"
  | "others";

export type CategoryName =
  | "질문하기"
  | "노하우"
  | "동행"
  | "블로그"
  | "인스타그램"
  | "유튜브"
  | "틱톡"
  | "기타";

export interface BoardCategory {
  categoryId: CategoryId;
  categoryType: CategoryType;
  categoryName: CategoryName;
}

export const COMMUNITY_LIST: BoardCategory[] = [
  { categoryId: 1, categoryType: "question", categoryName: "질문하기" },
  { categoryId: 2, categoryType: "know-how", categoryName: "노하우" },
  { categoryId: 3, categoryType: "accompany", categoryName: "동행" },
  { categoryId: 4, categoryType: "others", categoryName: "기타" },
] as const;

export const FOLLOWS_LIST: BoardCategory[] = [
  { categoryId: 5, categoryType: "blog", categoryName: "블로그" },
  { categoryId: 6, categoryType: "instagram", categoryName: "인스타그램" },
  { categoryId: 7, categoryType: "youtube", categoryName: "유튜브" },
  { categoryId: 8, categoryType: "tictoc", categoryName: "틱톡" },
  { categoryId: 9, categoryType: "others", categoryName: "기타" },
] as const;

export const CATEGORY_LIST: Record<BoardType, BoardCategory[]> = {
  announcement: [],
  community: COMMUNITY_LIST,
  follows: FOLLOWS_LIST,
} as const;
