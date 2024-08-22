import ms from "@/utils/modifierSelector";
import styles from "./index.module.scss";

interface PaginationButtonProps {
  children: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const span = ms(styles, "span");

const PaginationButton = ({
  children,
  label,
  isActive = false,
}: PaginationButtonProps) => {
  return (
    <button type="button" className={styles.button} aria-label={label}>
      {typeof children === "string" || typeof children === "number" ? (
        <span className={span(isActive && "--active")}>{children}</span>
      ) : (
        children
      )}
    </button>
  );
};

export default PaginationButton;
