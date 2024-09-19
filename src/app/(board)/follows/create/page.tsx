import dynamic from "next/dynamic";
import PostDivider from "@/components/Board/PostDivider";
import SkeletonPostForm from "@/components/Board/Skeleton/SkeletonPostForm";

const PostForm = dynamic(() => import("@/components/Board/PostForm"), {
  loading: () => <SkeletonPostForm />,
  ssr: false,
});

const FollowsCreate = () => {
  return (
    <>
      <PostDivider marginBottom="20px" />
      <PostForm pathname="follows" />
    </>
  );
};

export default FollowsCreate;
