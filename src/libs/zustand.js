import { create } from "zustand";

const useStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (data) => set((state) => ({ isLoggedIn: data })),
}));

export default useStore
