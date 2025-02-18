"use  client"
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function NavBar(props: any){

  const [isPending, startTransition] = useTransition()
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


    return (
        <nav className="flex items-center py-3 w-full rounded-lg bg-white  justify-between px-8">
          <div className="inline cursor-pointer">
            <Image onClick={() =>{ changeRoute('/admin/dashboard')}} src="/logo/logo.svg" alt="logo" width={100} height={100} />
          </div>
          <div className="flex gap-24 justify-between items-center">
            <div className="inline-flex gap-0 items-center relative">
              <div className="w-16 rounded-full cursor-pointer">
                <Image
                  onClick={() =>{ changeRoute('/admin/dashboard/users/profile')}}
                  src={props.profile}
                  alt="profile"
                  className="w-full rounded-full h-full  object-cover"
                />
              </div>
              <div className="absolute left-14 flex flex-col text-midnightblue">
                <span className="text-[10px] text-nowrap font-semibold">Kone-Fousseni</span>
                <span className="text-[9px]">Admin</span>
              </div>
            </div>
            <button  onClick={handleLogout} 
            disabled={isPending}
            className="border flex gap-2 items-center p-1 rounded">
              <span>{isPending ? "Déconnexion..." : "Se Déconnecter"}</span>
              <Image
                src="/icons/logout.svg"
                width={10}
                height={10}
                alt="Déconnexion"
              />
            </button>
          </div>
        </nav>
    )
}