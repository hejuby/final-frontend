"use client";

import { useRouter } from "next/navigation";
import Icon404 from "@/assets/icons/icon-404.svg";
import styles from "./index.module.scss";
import Button from "../Button";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className={styles["notfound-container"]}>
      <Icon404 />
      <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
      <div>
        <p>이용에 불편을 드려 죄송합니다.</p>
        <p>
          주소가 잘못 입력되었거나 변경 또는 삭제되어 요청하신 페이지를 찾을 수
          없습니다.
        </p>
        <p>입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.</p>
      </div>
      <div className={styles["button-wraaper"]}>
        <Button
          type="button"
          full
          size="medium"
          onClick={() => router.push("/")}
        >
          홈페이지 바로가기
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
