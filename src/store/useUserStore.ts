import { create } from "zustand";

interface UserStore {
  isLogin: boolean;
  name: string;
  profileImageUrl: string;
  isInfluencer: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setName: (name: string) => void;
  setProfileImageUrl: (profileImageUrl: string) => void;
  setIsInfluencer: (isInfluencer: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  name: "",
  profileImageUrl: "",
  isInfluencer: false,
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
  setName: (name: string) => set({ name }),
  setProfileImageUrl: (profileImageUrl: string) => set({ profileImageUrl }),
  setIsInfluencer: (isInfluencer: boolean) => set({ isInfluencer }),
}));

export default useUserStore;
