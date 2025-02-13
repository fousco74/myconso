import Image from "next/image";
import { meterCard } from "@/types";


export default function meterCard( props : meterCard){

    return(
<div className={`w-1/2 rounded-xl p-2 bg-${props.color || "skyGreen"} bg-gre flex flex-col relative`}>
        <Image src={`/icons/${props.icon}.svg`} width={35} height={35} alt="icon" />
            <div className="absolute top-12 text-white space-y-2">
                <h3 className="text-[13px] opacity-80">{props.subTitle}</h3>
                <h1 className="text-base font-bold">{props.title}</h1>
            </div>
        </div>
    )
}