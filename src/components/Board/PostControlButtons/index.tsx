"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import styles from "./index.module.scss";

interface PostControlProps {
  handleClick: () => void;
}

const PostControlButtons = ({ handleClick }: PostControlProps) => {
  const router = useRouter();

  return (
    <nav className={styles.control}>
      <Button color="outline" onClick={() => router.back()}>
        취소
      </Button>
      <Button onClick={handleClick}>등록</Button>
    </nav>
  );
};

export default PostControlButtons;
