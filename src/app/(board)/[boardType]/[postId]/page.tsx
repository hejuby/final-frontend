import { BoardType } from "@/@types/board";
import { CommunityItemProps } from "@/components/Board/ListItem";
import Title from "@/components/Board/Title";
import Line from "@/components/Line";
import AnnouncementTitle from "@/components/Board/AnnouncementTitle";
import PostTitle from "@/components/Board/PostTitle";
import PostContent from "@/components/Board/PostContent";
import mockData from "@/assets/mockData.json";

const Post = async ({
  params,
}: {
  params: { boardType: BoardType; postId: string };
}) => {
  const data = mockData[params.boardType] as CommunityItemProps[];
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
      <PostContent content={post.content} />
    </>
  );
};

export default Post;
