import React, { memo } from "react";
import Button from "@/components/Button";
import styles from "./index.module.scss";

interface DialogContainerProps {
  message: string;
  type: "alert" | "confirm";
  onConfirm: () => void;
  onCancel: () => void;
}

const DialogContainer: React.FC<DialogContainerProps> = ({
  message,
  type,
  onConfirm,
  onCancel,
}) => (
  <>
    <div
      className={styles["dialog-dim"]}
      onClick={onCancel}
      aria-hidden="true"
    />
    <section className={styles.dialog}>
      {message && <p className={styles.dialog__message}>{message}</p>}
      <div className={styles["dialog__button-wrapper"]}>
        {type !== "alert" && (
          <Button type="button" onClick={onCancel} color="outline--gray">
            취소
          </Button>
        )}
        <Button type="button" onClick={onConfirm}>
          확인
        </Button>
      </div>
    </section>
  </>
);

export default memo(DialogContainer);
