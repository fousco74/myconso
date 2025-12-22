"use client";
import { usePathname } from "next/navigation";
import Item from "./item";
import { UserAuth } from "../../Hooks/UseAuth";
import { getUser } from "@/app/(auth)/login/action";
import { userProps } from "@/types";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function  Dashboard({ children }: { children: React.ReactNode }) {

    const menus = [
      {
        icon: "dashboard",
        name: "Dashboard",
        url: "/admin/dashboard"
      },
       {
         icon: "index",
         name: "Index",
         url: "/admin/dashboard/index"
       },
       {
         icon: "stats1",
         name: "Statistiques",
         url: "/admin/dashboard/statistiques"
   
       },
       {
         icon: "users",
         name: "Utilisateurs",
         url: "/admin/dashboard/users"
   
       },
       {
         icon: "invoices",
         name: "Factures",
         url: "/admin/dashboard/invoices"
   
       },
       {
         icon: "devices",
         name: "Appareils",
       }
     ];

     const pathName = usePathname();

    

  return (
      <div className="w-full h-screen flex flex-col md:flex-row py-4 md:py-8 gap-3 md:gap-5 justify-around">
        <div className="px-1 md:px-2 rounded-lg bg-white w-full md:max-w-fit">
          <ul className="py-4 space-x-4 md:space-x-0 md:space-y-4  justify-center items-center text-[10px] md:text-[10px] flex md:flex-col md:justify-center md:items-center">
            {menus.map((item) => (
              <Item
                key={item.icon}
                {...item}
                isActive={pathName === item.url}
              />
            ))}
          </ul>
        </div>

        <div className="flex flex-col w-full md:px-0">{children}</div>
      </div>
  );
}
