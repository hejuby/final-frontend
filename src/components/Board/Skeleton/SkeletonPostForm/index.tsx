import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

const cn = ms(styles, "skeleton");

const SkeletonPostForm = () => {
  return (
    <>
      <section className={cn("__category")} />
      <section className={cn("__title")} />
      <section className={cn("__editor")} />
    </>
  );
};

export default SkeletonPostForm;
