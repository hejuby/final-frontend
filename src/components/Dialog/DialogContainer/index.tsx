import React, { memo } from "react";
import ms from "@/utils/modifierSelector";
import Button from "@/components/Button";
import styles from "./index.module.scss";

interface DialogContainerProps {
  message: string;
  type: "alert" | "confirm";
  onConfirm: () => void;
  onCancel: () => void;
}

const cn = ms(styles, "dialog");

const DialogContainer: React.FC<DialogContainerProps> = ({
  message,
  type,
  onConfirm,
  onCancel,
}) => (
  <>
    <div className={cn("-dim")} onClick={onCancel} aria-hidden="true" />
    <div className={cn("-container")}>
      {message && <p className={styles.dialog__message}>{message}</p>}
      <div className={cn("__button-container")}>
        {type !== "alert" && (
          <Button type="button" onClick={onCancel} color="outline--gray">
            취소
          </Button>
        )}
        <Button type="button" onClick={onConfirm}>
          확인
        </Button>
      </div>
    </div>
  </>
);

export default memo(DialogContainer);
