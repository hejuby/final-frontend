"use client";

import { useState, FormEvent } from "react";
import IconSearch from "@/assets/icons/icon-search.svg";
import styles from "./index.module.scss";

interface SearchProps {
  onSearch: (keyword: string) => void;
}

const Searchbox = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <div className={styles["searchbox-container"]}>
        <input
          type="search"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.form__input}
          placeholder="체험단을 검색해보세요"
        />
        <button
          type="submit"
          className={styles.form__button}
          aria-label="체험단 검색"
        >
          <IconSearch viewBox="0 0 24 24" />
        </button>
      </div>
    </form>
  );
};

export default Searchbox;
