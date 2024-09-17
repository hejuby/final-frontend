"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BoardPostResponse } from "@/@types/board";
import PostDivider from "@/components/Board/PostDivider";
import PostForm from "@/components/Board/PostForm";
import { CATEGORY_LIST } from "@/@types/board";

const CommunityEdit = ({ params }: { params: { postId: string } }) => {
  const { data } = useQuery<unknown, unknown, BoardPostResponse>({
    queryKey: ["communities", params.postId],
    queryFn: () =>
      axios.get(
        `https://g6-server.dainreview.kr/api/post/communities/${params.postId}`,
        { withCredentials: true },
      ),
  });

  if (!data) {
    return null;
  }

  const post = data.data;

  return (
    <>
      <PostDivider marginBottom="20px" />
      <PostForm
        pathname="communities"
        postId={params.postId}
        category={
          CATEGORY_LIST.communities.find(
            (category) => category.categoryName === post.categoryType,
          )?.categoryType
        }
        title={post.title}
        content={post.content}
        isEdit
      />
    </>
  );
};

export default CommunityEdit;
