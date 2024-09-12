"use client";

import { useState } from "react";
import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

interface Tab {
  id: string;
  label: string;
  content?: React.ReactNode;
}

interface CategoryTabProps {
  tabs: Tab[];
  activeTabId?: string;
  handleSelect?: (id: string) => void;
  handleDeselect?: (id: string) => void;
}

const cn = ms(styles, "category-tab__button");

const CategoryTab = ({
  tabs,
  activeTabId,
  handleSelect,
  handleDeselect,
}: CategoryTabProps) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(
    activeTabId ?? null,
  );

  const handleTabClick = (id: string) => {
    if (selectedTab === id) {
      setSelectedTab(null);
      if (handleDeselect) {
        handleDeselect(id);
      }
      return;
    }

    setSelectedTab(id);
    if (handleSelect) {
      handleSelect(id);
    }
  };

  return (
    <ul className={styles["category-tab"]}>
      {tabs.map((tab) => (
        <li key={tab.id}>
          <button
            className={cn(tab.id === selectedTab && "--active")}
            onClick={() => handleTabClick(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryTab;
