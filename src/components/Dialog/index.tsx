"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import useDialog from "@/hooks/useDialog";
import useDialogStore from "@/store/useDialogStore";
import DialogContainer from "./DialogContainer";

const Dialog = () => {
  const [mounted, setMounted] = useState(false);
  const { revealed, messages, type } = useDialogStore();
  const { onInteractionEnd } = useDialog();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (revealed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [revealed]);

  const handleConfirmClick = useCallback(() => {
    onInteractionEnd(true);
  }, [onInteractionEnd]);

  const handleCancelClick = useCallback(() => {
    onInteractionEnd(false);
  }, [onInteractionEnd]);

  if (!mounted) return null;

  const dialogContainer = document.getElementById("dialog");
  if (!dialogContainer) return null;

  return createPortal(
    revealed ? (
      <div>
        <DialogContainer
          messages={messages}
          type={type}
          onConfirm={handleConfirmClick}
          onCancel={handleCancelClick}
        />
      </div>
    ) : null,
    dialogContainer,
  );
};

export default Dialog;
