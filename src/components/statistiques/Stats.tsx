import Image from "next/image";
import LineChart from "@/components/charts/LineChart";
import Select from "@/components/forms/Select";

export default function Stats(){
    return(
        <div className="flex flex-col gap-2">
            <div className="flex justify-between px-5 py-1">
              <div className="flex gap-1 px-5 justify-center items-center">
                <span>Statistiques</span>
                <Image src="/icons/stats.svg" alt="stat-icon" width={22} height={22} className="border rounded-full p-1 bg-cloudGray"/>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <Select name="date" options={[{
                  name: "Cette semaine"
                }]} />
                <Image src="/icons/stats.svg" alt="stat-icon" width={22} height={22} className="border rounded-full p-1 bg-cloudGray"/>

              </div> 
            </div>
            <div className="px-4">
              <LineChart height="200" />
            </div>

        </div>
    )

}