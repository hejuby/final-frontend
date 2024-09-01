import PostDivider from "@/components/Board/PostDivider";

const FollowsPostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PostDivider marginBottom="30px" />
      {children}
    </>
  );
};

export default FollowsPostLayout;
