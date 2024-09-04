import React, { useRef, useEffect } from "react";
import styles from "./index.module.scss";

interface ICommonModal {
  isModal: boolean;
  children: React.ReactNode;
  onBackDrop?: () => void;
}

const Modal = ({ isModal, children, onBackDrop }: ICommonModal) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (onBackDrop) onBackDrop();
      }
    };
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (onBackDrop) onBackDrop();
      }
    };

    if (isModal) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscKeyPress);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKeyPress);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isModal, onBackDrop]);

  const handleBackdropKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      if (onBackDrop) onBackDrop();
    }
  };

  if (!isModal) return null;

  return (
    <div
      className={styles["modal-backdrop"]}
      onClick={onBackDrop}
      onKeyDown={handleBackdropKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Close modal"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
