import ManageProgress from "@/components/Campaign/ManageProgress";

const Page = () => {
  return (
    <h2>
      체험단 관리
      <ManageProgress activeIndex={0} />
      <ManageProgress activeIndex={1} />
      <ManageProgress activeIndex={2} />
      <ManageProgress activeIndex={3} />
    </h2>
  );
};

export default Page;
