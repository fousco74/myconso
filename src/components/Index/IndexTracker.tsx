"use client"
import Image from "next/image";
import Select from "@/components/forms/Select";

interface IndexTrackerProps {
    class?: string;
    lastIndex?: number;
}   

export default function IndexTracker(props: IndexTrackerProps){

    

    
    
    return (
        <div className={`h-32 bg-white p-1 px-2 ${props.class || 'w-full'}  rounded-lg flex flex-col gap-4`}>
            <div className="flex gap-2 items-start w-full">
                <div className="flex flex-col text-[11px]">
                    <h1 className="font-bold text-blueGradient">Index Tracker Mensuel</h1>
                    <p>Suivez vos enregistrements d&apos;index</p>
                </div>
                <div className="flex justify-center items-center">
                <Select name="date" options={[{
                    name: "Janvier"
                }]} />
                </div>  
            </div>
        
            <div className="flex relative">
        
                <div className="grid grid-cols-11 gap-1 absolute left-1 top-0">
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                    <span className="p-1 rounded-full bg-black"></span>
                </div>
                <div className="flex flex-col absolute text-white bg-whiteBlue  p-1 rounded-lg  right-1 top-[-20px] text-[9px]">
                    <div className="flex gap-1 ">
                        <h1>Dernier index <br />enregistré</h1>
                        <Image src="/icons/index.svg" alt="index" width={20} height={20} />
                    </div>
                    <p className="flex gap-1">
                        <span className="text-lg font-semibold">{props.lastIndex}</span>
                        <span className=" self-center text-[9px]">Kwh</span>
                    </p>
                </div>
        
            </div>
        
            </div>
    )
}