import PostDivider from "@/components/Board/PostDivider";
import PostForm from "@/components/Board/PostForm";
import { CATEGORY_LIST } from "@/@types/board";
import { CommunityItemProps } from "@/components/Board/ListItem";
import mockData from "@/assets/mockData.json";

const CommunityEdit = async ({ params }: { params: { postId: string } }) => {
  const data = mockData.community as CommunityItemProps[];
  const post = data.find((item) => item.id === Number(params.postId));

  if (!post) {
    return null;
  }

  return (
    <>
      <PostDivider marginBottom="20px" />
      <PostForm
        pathname="community"
        category={
          CATEGORY_LIST.community.find(
            (category) => category.categoryId === post.categoryId,
          )?.categoryType
        }
        title={post.title}
        content={post.content}
      />
    </>
  );
};

export default CommunityEdit;
