"use client"
import Dashboard from "@/components/DashboardComponent";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function IndexSucess(){

    const router = useRouter();

    const back = () => {
        router.back();
    }
    return (
        <Dashboard>
            <div className="w-full h-full bg-white flex flex-col p-4 gap-6 rounded-lg">
                <div className="flex flex-row-reverse self-start  gap-3 items-center">
                    <h1>Retour</h1>
                    <Image onClick={back} src="/icons/back.svg" alt="index-icon" width={25} height={25} className="cursor-pointer" />
                </div>
                <div className="flex flex-col justify-center items-center h-full gap-16 text-midnightblue">
                    <span className="text-lg">Index enregistré avec succès !</span>
                    <Image src="/icons/success.svg" alt="index-icon" width={350} height={350} />
                </div>
            </div>
        </Dashboard>
    )
}