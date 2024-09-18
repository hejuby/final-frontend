"use client";

import { useState } from "react";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  BoardPostResponse,
  CommentResponse,
  CommentPage,
} from "@/@types/board";
import PostDivider from "@/components/Board/PostDivider";
import PostTitle from "@/components/Board/PostTitle";
import PostContent from "@/components/Board/PostContent";
import MobileCommentCount from "@/components/Board/MobileCommentCount";
import CommentInput from "@/components/Board/CommentInput";
import Comment from "@/components/Board/Comment";
import MoreCommentsButton from "@/components/Board/MoreCommentsButton";
import PostNavigation from "@/components/Board/PostNavigation";
import MobileTopButton from "@/components/Board/MobileTopButton";
import styles from "./page.module.scss";

const Post = ({ params }: { params: { postId: string } }) => {
  const [temporaryCommentDeleteCount, setTemporaryCommentDeleteCount] =
    useState<number>(0);
  const { data: postData } = useQuery<unknown, unknown, BoardPostResponse>({
    queryKey: ["communities", params.postId],
    queryFn: () =>
      axios.get(
        `https://g6-server.dainreview.kr/api/post/communities/${params.postId}`,
        { withCredentials: true },
      ),
  });
  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    CommentResponse,
    unknown,
    CommentPage,
    unknown[],
    number
  >({
    queryKey: ["comments", params.postId],
    queryFn: (pageParam) =>
      axios.get(
        `https://g6-server.dainreview.kr/api/post/${params.postId}/comments${pageParam.pageParam ? `?page=${pageParam.pageParam}` : ""}`,
        { withCredentials: true },
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam + 1 >= allPages[0].data.comments.totalPages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  if (!postData || !commentPages) {
    return null;
  }

  const post = postData.data;

  return (
    <>
      <PostDivider marginBottom="30px" />
      <section className={styles.post}>
        <PostTitle post={post} />
        <PostContent content={post.content} />
      </section>
      <aside className={styles.comment}>
        <MobileCommentCount
          count={
            commentPages.pages[0].data.comments.totalElements +
            commentPages.pages[0].data.replies.length -
            temporaryCommentDeleteCount
          }
        />
        <CommentInput postId={parseInt(params.postId, 10)} />
        <section>
          <ul>
            {commentPages.pages.map((page) =>
              page.data.comments.content.map((commentItem) => (
                <li key={commentItem.id}>
                  <Comment
                    postId={parseInt(params.postId, 10)}
                    comment={commentItem}
                    handleDelete={() => {
                      setTemporaryCommentDeleteCount((prev) => prev + 1);
                    }}
                    replies={page.data.replies.filter(
                      (reply) => reply.parentId === commentItem.id,
                    )}
                  />
                </li>
              )),
            )}
          </ul>
          {hasNextPage && (
            <MoreCommentsButton
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            />
          )}
        </section>
      </aside>
      <PostNavigation
        previous={post.previousPostId}
        next={post.nextPostId}
        list="/communities"
      />
      <MobileTopButton />
    </>
  );
};

export default Post;
