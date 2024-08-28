import React from "react";
import styles from "./index.module.scss";

interface CategoryProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const Category: React.FC<CategoryProps> = ({ icon: Icon, label }) => {
  return (
    <div className={styles["category-item"]}>
      <Icon width={52} height={52} />
      <p>{label}</p>
    </div>
  );
};

export default Category;
