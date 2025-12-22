// components/AuthHydrator.tsx
"use client"
import { useEffect } from "react"
import { useAuth } from "@/../Store/auth"
import { userProps } from "@/types"

export default function AuthHydrator({ user, children }: { user: userProps|null, children: React.ReactNode }) {
  const { user: userState, setUser } = useAuth()
  useEffect(() => {
    if (user && !userState) setUser(user)
  }, [user, setUser, userState])
  return <>{children}</>
}
