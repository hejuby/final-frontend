import { create } from "zustand";

interface StoreState {
  title: string;
  setTitle: (title: string) => void;
}

const useHeaderStore = create<StoreState>((set) => ({
  title: "다인리뷰",
  setTitle: (title) => set({ title }),
}));

export default useHeaderStore;
