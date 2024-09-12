import { DialogStore } from "@/@types/useDialogStore";
import { create } from "zustand";

export default create<DialogStore>((set) => ({
  messages: [],
  setMessage: (...messages) => {
    set((prev) => ({ ...prev, messages }));
  },
  type: "alert",
  setType: (type) => {
    set((prev) => ({ ...prev, type }));
  },
  revealed: false,
  setRevealed(revealed) {
    set((prev) => ({ ...prev, revealed }));
  },
  setResponseHandler(responseHandler) {
    set((prev) => ({ ...prev, responseHandler }));
  },
}));
