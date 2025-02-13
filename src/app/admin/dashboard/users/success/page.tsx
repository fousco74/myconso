import Dashboard from "@/components/DashboardComponent";
import Image from "next/image";
import Form from "@/components/forms/Form";


export default function userSucess(){
    return (
        <Dashboard>
            <div className="w-full h-full bg-white flex flex-col p-4 gap-6 rounded-lg">
                <div className="flex flex-row-reverse self-start  gap-3 items-center">
                    <h1>Retour</h1>
                    <Image src="/icons/back.svg" alt="index-icon" width={25} height={25} />
                </div>
                <div className="flex flex-col justify-center items-center h-full gap-16 text-midnightblue">
                    <span className="text-lg">Utilisateur ajouté avec succès !</span>
                    <Image src="/icons/success.svg" alt="index-icon" width={350} height={350} />
                </div>
            </div>
        </Dashboard>
    )
}