"use client";

import IconDirectionUp from "@/assets/icons/icon-direction-up.svg";
import styles from "./index.module.scss";

const MobileTopButton = () => {
  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button type="button" className={styles.button} onClick={handleTopClick}>
      <IconDirectionUp viewBox="0 0 24 24" />
      <p>맨 위로</p>
    </button>
  );
};

export default MobileTopButton;
