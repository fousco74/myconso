import CreateIndex from "@/components/Index/CreateIndex";
import Table from "@/components/tables/Table";
import Image from "next/image";
import Select from "@/components/forms/Select";
import Filter from "@/components/Filter";
import Dashboard from "@/components/DashboardComponent";

export default function Index(){
  
        

    return (
      <Dashboard>

<div className="flex flex-col w-full">
        
        <CreateIndex />
        <Table >
            <div className="flex  gap-3 items-center">
                <h1>Liste Index </h1>
                <Image src="/icons/index.svg" alt="index-icon" width={25} height={25} />
            </div>
            <Filter>
                <Image src="/icons/filter.svg" alt="filter-icon" width={25} height={25} className="cursor-pointer" />
                <Select name="date" options={[{
                    name: "Cette semaine"
                }]} />
            </Filter>
          </Table>

    
    </div>

      </Dashboard>

          )
}