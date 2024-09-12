import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "./index.module.scss";
import Authentication from "../Authentication";

const IdFind = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>아이디 찾기</h2>
      </header>
      <form className={styles.form}>
        <Input id="email" type="text" label="이름" full />
      </form>
      {/* <Authentication /> */}
      <div className={styles["button-container"]}>
        <Link href="/auth/id-find-complete">
          <Button size="medium" full>
            확인
          </Button>
        </Link>
        <Link href="/auth/pw-find">
          <Button size="medium" color="outline" full>
            비밀번호 찾기
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default IdFind;
