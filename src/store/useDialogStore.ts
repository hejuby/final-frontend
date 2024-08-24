import { DialogStore } from "@/@types/useDialogStore";
import { create } from "zustand";

export default create<DialogStore>((set) => ({
  message: "",
  setMessage: (message) => {
    set((prev) => ({ ...prev, message }));
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
