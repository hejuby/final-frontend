"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/store/useUserStore";
import { BoardPostResponse, CATEGORY_LIST } from "@/@types/board";
import PostDivider from "@/components/Board/PostDivider";
import PostForm from "@/components/Board/PostForm";

const FollowsEdit = ({ params }: { params: { postId: string } }) => {
  const { data } = useQuery<unknown, unknown, BoardPostResponse>({
    queryKey: ["follows", params.postId],
    queryFn: () =>
      axios.get(
        `https://g6-server.dainreview.kr/api/post/follows/${params.postId}`,
        { withCredentials: true },
      ),
  });
  const name = useUserStore((state) => state.name);
  const router = useRouter();

  if (!data) {
    return null;
  }

  const post = data.data;

  if (post.authorNickName !== name) {
    router.push("/follows");
  }

  return (
    <>
      <PostDivider marginBottom="20px" />
      <PostForm
        pathname="follows"
        postId={params.postId}
        category={
          CATEGORY_LIST.follows.find(
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

export default FollowsEdit;
