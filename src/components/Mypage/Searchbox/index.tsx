import IconSearch from "@/assets/icons/icon-search.svg";
import styles from "./index.module.scss";

const Searchbox = () => {
  return (
    <form className={styles.form}>
      <div className={styles["searchbox-container"]}>
        <input
          type="search"
          className={styles.form__input}
          placeholder="체험단을 검색해보세요"
        />
        <button
          type="submit"
          className={styles.form__button}
          aria-label="게시판 검색"
        >
          <IconSearch viewBox="0 0 24 24" />
        </button>
      </div>
    </form>
  );
};

export default Searchbox;
