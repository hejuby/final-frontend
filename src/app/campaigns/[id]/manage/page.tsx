import ManageProgress from "@/components/Campaigns/ManageProgress";
import ManageTable from "@/components/Campaigns/ManageTable";
import Button from "@/components/Button";
import styles from "./page.module.scss";

const Page = () => {
  return (
    <>
      <nav className={styles.nav}>
        <Button color="outline">일정확인</Button>
        <Button color="solid">모집종료</Button>
      </nav>
      <ManageProgress activeIndex={0} />
      <ManageTable />
    </>
  );
};

export default Page;
