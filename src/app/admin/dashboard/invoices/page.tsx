import Dashboard from "@/components/DashboardComponent";
import Image from "next/image";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input"
import Button from "@/components/buttonBlue";
import Link from "next/link";
import InputDate from "@/components/forms/InputDate"
import Select from "@/components/forms/Select"
import Invoice from "@/components/Invoices/Invoice";



export default function invoices(){
    return (
        <Dashboard>
            <div className="flex gap-5 h-full">
                <div className="h-full bg-white w-[40%] flex flex-col p-4 gap-6 rounded-lg">
                <h1 className="text-lg text-midnightblue font-semibold ml-20 mt-6">Prédire ma facture</h1>
                    <div className="flex flex-col justify-center items-center mt-10 gap-5">
                        <Form width="w-[250px]">
                            <Input name="Username" label="Ancien index" placeholder="Entrer l’index" />
                            <Input name="Username" label="Nouveau index" placeholder="Entrer l’index" />
                            <div className="mt-8">
                                <Button name="Prédire ma facture" icon="white-invoice"/>
                            </div>
                        </Form>

                        <div className="text-center bg-cloudGray w-[250px] py-3 rounded-sm text-midnightblue">
                            <span className="text-4xl">85.250</span>
                            <span>FCFA</span>
                        </div>
                        <Link href="" className="text-[11px] text-green border-b border-green">Voir la facture complète</Link>
                    </div>
                    
                    
                </div>
                <div className="h-full bg-white flex-1 flex flex-col px-8 py-3 gap-6 rounded-lg">
                    <h1 className="text-lg text-midnightblue font-semibold mt-6">Mes factures</h1>
                    <div className="flex gap-3 items-center text-midnightblue justify-end">
                                    <Image src="/icons/filter.svg" alt="filter-icon" width={25} height={25} className="cursor-pointer" />
                                    <Select name="date" options={[{
                                        name: "Cette semaine"
                                    }]} />
                                    <div className="flex gap-1 justify-center items-center">
                                        <span>Du</span>
                                        <InputDate />
                                    </div>
                                    <div className="flex gap-1 justify-center items-center">
                                        <span>Au</span>
                                        <InputDate />
                                    </div> 
                                </div>
                                <div className="grid lg:grid-cols-4 overflow-y-auto gap-2 mt-3">
                                    <Invoice />
                                    <Invoice />
                                    <Invoice />
                                    <Invoice />
                                    <Invoice />
                                </div>
                </div>
                   
            </div>
        </Dashboard>
    )
}