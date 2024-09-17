"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import createPaginationArray from "@/utils/createPaginationArray";
import createParamsURL from "@/utils/createParamsURL";
import IconDirectionLeft from "@/assets/icons/icon-direction-left-white.svg";
import IconDirectionRight from "@/assets/icons/icon-direction-right-white.svg";
import PaginationButton from "./PaginationButton";
import styles from "./index.module.scss";

interface PaginationProps {
  pathname: string;
  searchParams: { page: string };
  chunkSize: number;
  totalPages: number;
}

const Pagination = ({
  pathname,
  searchParams,
  chunkSize,
  totalPages,
}: PaginationProps) => {
  const currentPage = Number(searchParams.page) || 0;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentChunk, setCurrentChunk] = useState<number>(chunkSize);

  const filterPageNumber = (pageNumber: number | string) => {
    if (Number(pageNumber) < 0) {
      return 0;
    }
    if (Number(pageNumber) > totalPages - 1) {
      return totalPages - 1;
    }
    return pageNumber;
  };

  const createPageURL = (pageNumber: number | string) =>
    createParamsURL(
      "set",
      searchParams,
      pathname,
      "page",
      filterPageNumber(pageNumber).toString(),
    );

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    handleResize();
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setCurrentChunk((prev) => Math.ceil(prev / 2));
    }
  }, [isMobile]);

  return (
    <nav className={styles.flex}>
      <Link
        href={createPageURL(
          currentPage - chunkSize - (currentPage % currentChunk),
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
        {createPaginationArray(currentChunk, totalPages, currentPage).map(
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
                  {index + 1}
                </PaginationButton>
              </Link>
            </li>
          ),
        )}
      </ul>
      <Link
        href={createPageURL(
          currentPage + currentChunk - (currentPage % currentChunk),
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
