import IconCheck from "@/assets/icons/icon-check-blue.svg";
import styles from "./index.module.scss";

interface RegisterProgressProps {
  currentStep: number;
  stepList: string[];
}

const RegisterProgress: React.FC<RegisterProgressProps> = ({
  currentStep,
  stepList,
}) => {
  return (
    <ul className={styles["progress-container"]}>
      {stepList.map((stepItem, index) => {
        const isComplete = index < currentStep - 1;
        const isCurrent = index + 1 === currentStep;

        return (
          <li
            // eslint-disable-next-line
            key={index}
            className={`${styles["step-item"]} ${isComplete ? styles.complete : ""}`}
          >
            <div
              className={`${styles.number} ${isCurrent ? styles.current : ""} ${isComplete ? styles.complete : ""}`}
            >
              {isComplete ? <IconCheck /> : index + 1}
            </div>
            <p
              className={`${styles.label} ${isCurrent ? styles.current : ""} ${isComplete ? styles.complete : ""}`}
            >
              {stepItem}
            </p>
            <div
              className={`${styles.bar} ${isComplete ? styles.complete : ""}`}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default RegisterProgress;
