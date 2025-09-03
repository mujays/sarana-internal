import { UserType } from "@/services/auth/auth.dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserStore = {
  user: UserType | null;
  logout: () => void;
  setHydrate: () => void;
  setUser: (value: UserType) => void;
  hasHydrated: boolean;
};

export const authStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      setHydrate: () =>
        set((state) => ({
          ...state,
          hasHydrated: true,
        })),
      setUser: (value) =>
        set((state) => ({
          ...state,
          user: value,
        })),
      logout: () =>
        set({
          user: null,
          hasHydrated: true, // reset juga
        }),
    }),
    {
      name: "user_info",
      onRehydrateStorage: () => (state) => {
        state?.setHydrate();
      },
    }
  )
);
