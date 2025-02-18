import Image from "next/image";

import ButtonBlue from "@/components/ButtonBlue";
import IndexTracker from "@/components/Index/IndexTracker";

import InputDate from "@/components/forms/InputDate";
import AddIndex from "./AddIndex";

export default function index(){
    return (
        <div className="flex flex-col mb-4 w-full bg-white py-5 right-3 rounded-lg ">
                <IndexTracker class="absolute w-64 right-44 shadow-sm top-48" />
              <div className="flex px-8 gap-3">
                <h1>L’Index du jour</h1>
                <Image src="/icons/index.svg" alt="index-icon" width={25} height={25} />
              </div>
                <AddIndex />
              </div>
    )
}