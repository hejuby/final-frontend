"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import createParamsURL from "@/utils/createParamsURL";
import IconSearch from "@/assets/icons/icon-search.svg";
import styles from "./index.module.scss";

interface SearchProps {
  pathname: string;
  searchParams: { page: string; category?: string };
}

const Search = ({ pathname, searchParams }: SearchProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        router.push(
          createParamsURL(
            "set",
            searchParams,
            pathname,
            "keyword",
            (event.target as HTMLFormElement).query.value,
          ),
        );
        queryClient.invalidateQueries({ queryKey: [pathname] });
      }}
    >
      <input
        type="text"
        name="query"
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
