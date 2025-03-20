"use client";
import Image from "next/image";
import IndexTracker from "@/components/Index/IndexTracker";
import AddIndex from "./AddIndex";
import { useEffect, useState } from "react";
import { userProps } from "@/types";
import { getUser } from "@/app/(auth)/login/action";

interface CreateIndexProps {
  user: userProps | null;
  setUser: React.Dispatch<React.SetStateAction<userProps|null>>;
  setAllIndex: React.Dispatch<React.SetStateAction<Index[]>>;
  setAllIndexFiltered: React.Dispatch<React.SetStateAction<Index[]>>;
}

export default function Index({user, setUser, setAllIndex, setAllIndexFiltered}: CreateIndexProps){


    return (
        <div className="flex flex-col mb-4 w-full bg-white py-5 rounded-lg relative">
              <IndexTracker user={user} className="absolute w-64 right-32 shadow-sm top-24 max-md:hidden" />

              <div className="flex px-8 gap-3">
                <h1>L’Index du jour</h1>
                <Image src="/icons/index.svg" alt="index-icon" width={25} height={25} />
              </div>
                <AddIndex setAllIndex={setAllIndex} setAllIndexFiltered={setAllIndexFiltered} setUser={setUser} user={user} />
              </div>
    )
}