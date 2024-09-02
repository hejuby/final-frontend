import Link from "next/link";
import Button from "@/components/Button";
import styles from "./index.module.scss";

interface PostButtonProps {
  href: string;
}

const PostButton = ({ href }: PostButtonProps) => {
  return (
    <Link href={href} className={styles.wrapper}>
      <Button padding="23px">글 작성</Button>
    </Link>
  );
};

export default PostButton;
