// app/(users)/layout.tsx
import { getUser } from "@/app/(auth)/login/action"
import AuthHydrator from "@/components/AuthHydrator"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser() // appelé côté serveur, 1 seule fois
  return (
    
        <AuthHydrator user={user}>
          {children}
        </AuthHydrator>

  )
}
