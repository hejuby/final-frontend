import { BoardType } from "@/@types/board";
import { CommunityItemProps } from "@/components/Board/ListItem";
import Title from "@/components/Board/Title";
import Line from "@/components/Line";
import AnnouncementTitle from "@/components/Board/AnnouncementTitle";
import PostTitle from "@/components/Board/PostTitle";

const Post = async ({
  params,
}: {
  params: { boardType: BoardType; postId: string };
}) => {
  const response = await fetch(
    `http://127.0.0.1:3000/api/board/${params.boardType}`,
  );
  const data: CommunityItemProps[] = await response.json();
  const post = data.find((item) => item.id === Number(params.postId));

  if (!post) {
    return null;
  }

  return (
    <>
      <Title boardType={params.boardType} />
      <Line />
      {params.boardType === "announcement" ? (
        <AnnouncementTitle post={post} />
      ) : (
        <PostTitle post={post} />
      )}
    </>
  );
};

export default Post;
