import IconKakaoBlue from "@/assets/icons/icon-kakao-blue.svg";
import Link from "next/link";
import FloatingButton from "../FloatingButton";
import styles from "./index.module.scss";

const FloatingKakaoButton = () => {
  return (
    <FloatingButton bottom="120px">
      <Link
        href="https://pf.kakao.com/_ZGyxls" // Todo 경민: 추후 제공된 링크로 변경 예정
      >
        <IconKakaoBlue className={styles.icon} />
      </Link>
    </FloatingButton>
  );
};

export default FloatingKakaoButton;
