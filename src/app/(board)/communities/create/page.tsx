import PostDivider from "@/components/Board/PostDivider";
import PostForm from "@/components/Board/PostForm";

const CommunityCreate = () => {
  return (
    <>
      <PostDivider marginBottom="20px" />
      <PostForm pathname="communities" />
    </>
  );
};

export default CommunityCreate;
