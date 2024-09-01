import PostDivider from "@/components/Board/PostDivider";

const CommunityPostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PostDivider marginBottom="30px" />
      {children}
    </>
  );
};

export default CommunityPostLayout;
