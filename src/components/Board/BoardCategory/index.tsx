"use client";

import { useRouter } from "next/navigation";
import createParamsURL from "@/utils/createParamsURL";
import CategoryTab from "@/components/CategoryTab";
import { CATEGORY_LIST } from "@/@types/board";

interface BoardCategoryProps {
  pathname: "communities" | "follows";
  searchParams: { category: string };
  activeTab?: string;
}

const BoardCategory = ({
  pathname,
  searchParams,
  activeTab,
}: BoardCategoryProps) => {
  const router = useRouter();

  return (
    <CategoryTab
      tabs={CATEGORY_LIST[pathname].map((category) => {
        return {
          id: category.categoryType,
          label: category.categoryName,
        };
      })}
      activeTabId={activeTab}
      handleSelect={(id: string) => {
        const url = createParamsURL(
          "set",
          searchParams,
          `/${pathname}`,
          pathname === "communities" ? "communityType" : "followType",
          id,
        );
        router.push(url);
      }}
      handleDeselect={() => {
        const url = createParamsURL(
          "delete",
          searchParams,
          `/${pathname}`,
          "category",
        );
        router.push(url);
      }}
    />
  );
};

export default BoardCategory;
