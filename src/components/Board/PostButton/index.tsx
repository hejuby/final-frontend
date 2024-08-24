import Button from "@/components/Button";
import styles from "./index.module.scss";

const PostButton = () => {
  return (
    <div className={styles.div}>
      <Button>글 작성</Button>
    </div>
  );
};

export default PostButton;
