import { BoardType } from "@/@types/board";
import { CommunityItemProps } from "@/components/Board/ListItem";
import Title from "@/components/Board/Title";
import Line from "@/components/Line";
import AnnouncementTitle from "@/components/Board/AnnouncementTitle";
import PostTitle from "@/components/Board/PostTitle";
import PostContent from "@/components/Board/PostContent";
import CommentInput from "@/components/Board/CommentInput";
import Comment from "@/components/Board/Comment";
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
      {params.boardType !== "announcement" && (
        <>
          <CommentInput />
          <Comment
            id={123}
            text="아무래도 블로그를 오래하다보면 자연스럽게 겪는 자가복제(?) 현상인것 같아요ㅠㅠ 저도 매번 다른 말투, 다른 표현을 쓰려 노력하지만 결국 제 스타일을 벗어나기 힘들더라고요ㅎㅎ 그것도 제 블로그의 방향성이라 생각하고, 선정해주시는 업주분들의 니즈라고 생각하고 있어용"
            userId="123"
            userNickname="감자도리"
            date="2024-08-07-13-38"
          />
        </>
      )}
    </>
  );
};

export default Post;
