// Store/auth.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { userProps } from "@/types"

interface AuthState {
  user: userProps | null
  setUser: (user: userProps | null) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "user-storage" }
  )
)
