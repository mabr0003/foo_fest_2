import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,

      setLogIn: () => set({ isLoggedIn: true }),
      setLogOut: () => set({ isLoggedIn: false }),
    }),
    {
      name: "login-storage",
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    }
  )
);

export default useLoginStore;
