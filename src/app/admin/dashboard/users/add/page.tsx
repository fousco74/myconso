import Dashboard from "@/components/DashboardComponent";
import Image from "next/image";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input"
import Select from "@/components/forms/Select";
import ButtonBlue from "@/components/ButtonBlue"




export default function userAdd(){
    return (
        <Dashboard>
            <div className="w-full h-full bg-white flex flex-col p-4 gap-6 rounded-lg">
                <div className="flex  gap-3 items-center">
                    <h1>Utilisateur </h1>
                    <Image src="/icons/users.svg" alt="index-icon" width={25} height={25} />
                </div>
                <div className="flex justify-center items-center h-full">
                    <Form width="w-[350px]">
                        <Input name="Username" label="Username" placeholder="Username" />
                        <Input name="email" label="E-mail" placeholder="email"/>
                        <Select width="w-full p-2 py-[0.6rem] rounded" name="date" label="Rôle"  options={[{
                            name: "Sélectionner un rôle"
                        }]} />
                        <Input type="password" name="password" label="password" placeholder="password" />
                        <ButtonBlue width="w-full" name="Enregistrer" icon="recorded" />
                    </Form>
                </div>
            </div>
        </Dashboard>
    )
}