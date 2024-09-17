import { z } from "zod";

export type BoardId = "A" | "B" | "C";

export const BOARD_TYPE = ["announcement", "communities", "follows"] as const;

export type BoardType = (typeof BOARD_TYPE)[number];

export const BoardSchema = z.enum(BOARD_TYPE);

export type BoardName = "공지사항" | "커뮤니티" | "맞팔/서이추";

export type Board = {
  boardId: BoardId;
  boardType: BoardType;
  boardName: BoardName;
  boardCode: BoardCode;
};

export type BoardCode = "NOTICE" | "COMMUNITY" | "FOLLOW";

export const BOARD_LIST: Board[] = [
  {
    boardId: "A",
    boardType: "announcement",
    boardName: "공지사항",
    boardCode: "NOTICE",
  },
  {
    boardId: "B",
    boardType: "communities",
    boardName: "커뮤니티",
    boardCode: "COMMUNITY",
  },
  {
    boardId: "C",
    boardType: "follows",
    boardName: "맞팔/서이추",
    boardCode: "FOLLOW",
  },
] as const;

export type CategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type CategoryType =
  | "QUESTION"
  | "KNOWHOW"
  | "COMPANION"
  | "BLOG"
  | "INSTAGRAM"
  | "YOUTUBE"
  | "TIKTOK"
  | "ETC";

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
  { categoryId: 1, categoryType: "QUESTION", categoryName: "질문하기" },
  { categoryId: 2, categoryType: "KNOWHOW", categoryName: "노하우" },
  { categoryId: 3, categoryType: "COMPANION", categoryName: "동행" },
  { categoryId: 4, categoryType: "ETC", categoryName: "기타" },
] as const;

export const FOLLOWS_LIST: BoardCategory[] = [
  { categoryId: 5, categoryType: "BLOG", categoryName: "블로그" },
  { categoryId: 6, categoryType: "INSTAGRAM", categoryName: "인스타그램" },
  { categoryId: 7, categoryType: "YOUTUBE", categoryName: "유튜브" },
  { categoryId: 8, categoryType: "TIKTOK", categoryName: "틱톡" },
  { categoryId: 9, categoryType: "ETC", categoryName: "기타" },
] as const;

export const CATEGORY_LIST: Record<BoardType, BoardCategory[]> = {
  announcement: [],
  communities: COMMUNITY_LIST,
  follows: FOLLOWS_LIST,
} as const;

export interface BoardItem {
  id: number;
  authorNickName: string;
  authorProfileImageUrl: string;
  title: string;
  content: string;
  noticeBoardType: BoardName;
  categoryType: CategoryName;
  attachedFileUrls: null;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  contentPreview: string;
}

export interface BoardList {
  content: BoardItem[];
  totalElements: number;
  totalPages: number;
}

export interface BoardPost extends BoardItem {
  previousPostId: number | null;
  nextPostId: number | null;
}

export interface BoardResponse {
  data: BoardList;
}

export interface BoardPostResponse {
  data: BoardPost;
}

export interface CommentItem {
  id: number;
  parentId: number | null;
  userName: string;
  userProfileImage: string | null;
  content: string;
  createdAt: string;
}

export interface CommentList {
  content: CommentItem[];
  totalElements: number;
  totalPages: number;
}

export interface CommentListResponse {
  comments: CommentList;
  replies: CommentItem[];
}

export interface CommentResponse {
  data: CommentListResponse;
}

export interface CommentPage {
  pageParams: number[];
  pages: CommentResponse[];
}
