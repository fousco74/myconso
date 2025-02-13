import Dashboard from "@/components/DashboardComponent";
import Table from "@/components/tables/Table";
import Image from "next/image";
import ButtonBlue from "@/components/buttonBlue";

export default function users(){
    return(
        <Dashboard>
            <Table >
                <div className="flex  gap-3 items-center">
                    <h1>Liste des Utilisateurs </h1>
                    <Image src="/icons/users.svg" alt="index-icon" width={25} height={25} />
                </div>
                <ButtonBlue  name="Ajouter un utilisateur" icon="add-user" />
            </Table>   
        </Dashboard>
    )
}