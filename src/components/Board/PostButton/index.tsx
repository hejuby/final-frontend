import Link from "next/link";
import Button from "@/components/Button";
import FloatingButton from "@/components/FloatingButton";
import IconEdit from "@/assets/icons/icon-edit.svg";
import styles from "./index.module.scss";

interface PostButtonProps {
  href: string;
}

const PostButton = ({ href }: PostButtonProps) => {
  return (
    <Link href={href}>
      <nav className={styles.desktop}>
        <Button padding="23px">글 작성</Button>
      </nav>
      <nav className={styles.mobile}>
        <FloatingButton bottom="190px">
          <IconEdit viewBox="0 0 24 24" />
        </FloatingButton>
      </nav>
    </Link>
  );
};

export default PostButton;
