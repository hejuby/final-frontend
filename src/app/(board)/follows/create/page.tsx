import PostDivider from "@/components/Board/PostDivider";
import PostForm from "@/components/Board/PostForm";

const FollowsCreate = () => {
  return (
    <>
      <PostDivider marginBottom="20px" />
      <PostForm pathname="follows" />
    </>
  );
};

export default FollowsCreate;
