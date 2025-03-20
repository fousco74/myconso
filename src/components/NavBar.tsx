"use  client"
import { getUser } from "@/app/(auth)/login/action";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function NavBar(props?: any){

  const [isPending, startTransition] = useTransition()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<string>("")
  const handleLogout = () => {
    startTransition(async () => {
      const { signOut } = await import("@/app/(auth)/login/action")
      await signOut()
    })
  }

  const router = useRouter()

  const changeRoute = (url: string) =>{

    router.push(url)
  }

  useEffect(
    () => {
      getUser().then(async (data) => {
        if (data) {
          setUser(data)
          setProfile(data.profile)
        }
      })
    },[]
  )


  

    return (
      <nav className="flex flex-wrap gap-3 items-center py-2 md:py-3 w-full rounded-lg bg-white justify-between px-4 md:px-8">
        <div className="cursor-pointer flex-shrink-0">
          <Image 
            onClick={() => changeRoute('/admin/dashboard')} 
            src="/logo/logo.svg" 
            alt="logo" 
            width={80} 
            height={40}
            className="w-20 md:w-24" 
          />
        </div>
        
        <div className="flex gap-2 md:gap-40 items-center">
          <div onClick={() => changeRoute('/admin/dashboard/users/profile')} 
               className="flex items-center gap-2 cursor-pointer">
            <div className="max-md:w-10  max-md:h-10 rounded-full overflow-hidden">
              {profile && <Image  src={profile? profile: "/profile/avatar.webp"} alt="profile" width={40} height={40} className="object-cover" />}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs md:text-sm font-semibold">{user?.nom_complet}</span>
              <span className="text-[10px] md:text-xs opacity-75">{user?.role.name}</span>
            </div>
          </div>
          
          <button onClick={handleLogout} 
            className="flex items-center gap-1 md:gap-2 p-1 md:p-2 text-sm md:text-base">
            <span className="hidden md:inline">{isPending ? "Déconnexion..." : "Déconnexion"}</span>
            <Image
              src="/icons/logout.svg"
              width={16}
              height={16}
              className="md:w-5 md:h-5"
              alt="Déconnexion"
            />
          </button>
        </div>
      </nav>
    );
  }

