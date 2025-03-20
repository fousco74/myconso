import { itemProps } from "@/types";
import Image from 'next/image'
import Link from "next/link";


export default function Item({ url, name, icon, isActive }: itemProps) {
    return (
      <li className="w-full">
        <Link href={url || "#"} className={`flex flex-col w-full items-center justify-center ${isActive ? 'border-blue-500 border-b-4' :'hover:bg-cloudGray'} md:p-2  rounded`}>
          <Image 
            src={`/icons/${icon}.svg`} 
            alt={name}
            width={20}
            height={20}
            className="w-4 h-4 md:w-6 md:h-6"
          />
          <span className="whitespace-nowrap text-[10px] md:text-sm">{name}</span>
        </Link>
      </li>
    );
  }