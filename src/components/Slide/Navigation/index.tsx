import React from "react";

interface CustomNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  styles: { [key: string]: string };
}

const CustomNavigation: React.FC<CustomNavigationProps> = ({
  onPrev,
  onNext,
  styles = {},
}) => {
  return (
    <div className={styles["custom-nav"]}>
      <button
        type="button"
        onClick={onPrev}
        className={`${styles["custom-nav__btn"]} ${styles["left-button"]}`}
        aria-label="left-button"
      />
      <button
        type="button"
        onClick={onNext}
        className={`${styles["custom-nav__btn"]} ${styles["right-button"]}`}
        aria-label="right-button"
      />
    </div>
  );
};

export default CustomNavigation;
