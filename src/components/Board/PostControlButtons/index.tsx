"use client";

import { useRouter } from "next/navigation";
import useDialog from "@/hooks/useDialog";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const PostControlButtons = () => {
  const router = useRouter();
  const { confirm } = useDialog();

  return (
    <nav className={styles.control}>
      <Button
        color="outline"
        onClick={async () => {
          const confirmed = await confirm(
            "작성 중인 내용이 사라져요!",
            "그래도 계속하시겠어요?",
          );
          if (confirmed) {
            router.back();
          }
        }}
      >
        취소
      </Button>
      <Button type="submit">등록</Button>
    </nav>
  );
};

export default PostControlButtons;
