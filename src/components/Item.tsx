import { itemProps } from "@/types";
import Image from 'next/image'
import Link from "next/link";


export default function item (props : itemProps){
    return  <li className='flex flex-col relative  text-deepBlue justify-center items-center'>
                <Link href={`${props.url ? props.url : ""} `} className="cursor-pointer flex flex-col justify-center items-center">
                    <Image   src={`/icons/${props.icon}.svg`} alt={props.name}  width={30} height={30} className='rounded-full m-0'/>
                    <h3 className='mb-2 p-0 absolute top-7 '>{props.name}</h3>
                </Link>
            </li>
}