
"use server"

import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuthChecker({ children }: {children: React.ReactNode}) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data?.user) {
    redirect('/login')
  }

  return children
}
