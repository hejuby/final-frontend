import PostDivider from "@/components/Board/PostDivider";
import PostForm from "@/components/Board/PostForm";
import { CATEGORY_LIST } from "@/@types/board";
import { CommunityItemProps } from "@/components/Board/ListItem";
import mockData from "@/assets/mockData.json";

const FollowsEdit = async ({ params }: { params: { postId: string } }) => {
  const data = mockData.follows as CommunityItemProps[];
  const post = data.find((item) => item.id === Number(params.postId));

  if (!post) {
    return null;
  }

  return (
    <>
      <PostDivider marginBottom="20px" />
      <PostForm
        pathname="follows"
        category={
          CATEGORY_LIST.follows.find(
            (category) => category.categoryId === post.categoryId,
          )?.categoryType
        }
        title={post.title}
        content={post.content}
      />
    </>
  );
};

export default FollowsEdit;
