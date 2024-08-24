import IconSearch from "@/assets/icons/icon-search.svg";
import styles from "./index.module.scss";

const Search = () => {
  return (
    <form className={styles.form}>
      <input
        className={styles.form__input}
        placeholder="원하는 글을 찾아보세요"
      />
      <button
        type="submit"
        className={styles.form__button}
        aria-label="게시판 검색"
      >
        <IconSearch viewBox="0 0 24 24" />
      </button>
    </form>
  );
};

export default Search;
