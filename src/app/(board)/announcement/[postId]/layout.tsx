import PostDivider from "@/components/Board/PostDivider";

const AnnouncementPostLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <PostDivider marginBottom="30px" />
      {children}
    </>
  );
};

export default AnnouncementPostLayout;
