"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import createPaginationArray from "@/utils/createPaginationArray";
import IconDirectionLeft from "@/assets/icons/icon-direction-left-white.svg";
import IconDirectionRight from "@/assets/icons/icon-direction-right-white.svg";
import PaginationButton from "./PaginationButton";
import styles from "./index.module.scss";

interface PaginationProps {
  chunkSize: number;
  totalPages: number;
}

const Pagination = ({ chunkSize, totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const filterPageNumber = (pageNumber: number | string) => {
    if (Number(pageNumber) < 1) {
      return 1;
    }
    if (Number(pageNumber) > totalPages) {
      return totalPages;
    }
    return pageNumber;
  };

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", filterPageNumber(pageNumber).toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className={styles.flex}>
      <Link
        href={createPageURL(
          currentPage - chunkSize - (currentPage % chunkSize) + 1,
        )}
        aria-label="이전 페이지로 가기"
      >
        <PaginationButton label="이전 화살표">
          <IconDirectionLeft
            className={styles.svg}
            width="22px"
            height="22px"
          />
        </PaginationButton>
      </Link>
      <ul className={styles.flex}>
        {createPaginationArray(chunkSize, totalPages, currentPage).map(
          (index) => (
            <li key={index}>
              <Link
                href={createPageURL(index)}
                aria-label={`${index}번 페이지로 가기`}
              >
                <PaginationButton
                  isActive={currentPage === index}
                  label={`${index}번 페이지`}
                >
                  {index}
                </PaginationButton>
              </Link>
            </li>
          ),
        )}
      </ul>
      <Link
        href={createPageURL(
          currentPage + chunkSize - (currentPage % chunkSize) + 1,
        )}
        aria-label="다음 페이지로 가기"
      >
        <PaginationButton label="다음 화살표">
          <IconDirectionRight
            className={styles.svg}
            width="22px"
            height="22px"
          />
        </PaginationButton>
      </Link>
    </nav>
  );
};

export default Pagination;
