import ManageProgress from "@/components/Campaigns/ManageProgress";
import ManageTable from "@/components/Campaigns/ManageTable";
import ManageButtons from "@/components/Campaigns/ManageButtons";
import Line from "@/components/Line";
import styles from "./page.module.scss";

const Page = () => {
  return (
    <>
      <section className={styles.info}>
        <ManageButtons />
        <ManageProgress activeIndex={0} />
      </section>
      <section className={styles.divider}>
        <Line type="thick" />
      </section>
      <ManageTable />
    </>
  );
};

export default Page;
