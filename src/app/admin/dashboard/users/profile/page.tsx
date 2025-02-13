import Dashboard from "@/components/DashboardComponent";
import Image from "next/image";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input"
import Select from "@/components/forms/Select";
import ButtonBlue from "@/components/buttonBlue";


export default function profile(){
    const data = {
        name: 'fkone',
        role: 'admin',
        email: 'fkone@amoaman.com'
    }
    return (
        <Dashboard>
            <div className="w-full h-full bg-white flex flex-col p-4 gap-6 rounded-lg relative">
                <div className="flex flex-col absolute top-10 left-40">
                    <Image src="/profile/kone.png" alt="logo" width={150} height={150} />
                    <div className="flex gap-1">
                        <span className="text-[12px] text-midnightblue"> Modifier la Photo de profil </span>
                        <Image src="/icons/edit.svg" alt="logo" width={10} height={10} />
                    </div>
                </div>
                <div className="flex  gap-3 items-center">
                    <h1>Mon profil </h1>
                    <Image src="/icons/profile.svg" alt="index-icon" width={25} height={25} />
                </div>
                <div className="flex justify-center items-center h-full">
                    <Form width="w-[350px]">
                        <Input name="Username" label="Username" placeholder={data.name} />
                        <Input name="email" label="E-mail" placeholder={data.email}/>
                        <Select width="w-full p-2 py-[0.6rem] rounded" name="date" label="Rôle"  options={[{
                            name: `${data.role}`
                        }]} />
                        <Input type="password" name="password" label="password" placeholder="password" />
                        <ButtonBlue width="w-full" name="Enregistrer" icon="recorded" />
                    </Form>   
                </div>
            </div>
        </Dashboard>
    )
}