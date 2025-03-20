import Image from "next/image";
import LineChart from "@/components/charts/LineChart";
import Select from "@/components/forms/Select";
import { userProps } from "@/types";
import { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";

interface statsProps{
  user: userProps|null,
  compteurId: string
}

export default function Stats({user,compteurId} : statsProps){

  const [chart, setChart] = useState<number>(1);
  const [selectFilter, setSelectFilter] = useState<string>("week");
  const [consommationData, setConsommationData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Mise à jour des données de consommation
  useEffect(() => {
    if (user?.client?.consommation) {
      const initialData = user.client.consommation.filter(
        (conso) => conso.compteur_id === parseInt(compteurId)
      );
      setConsommationData(initialData);
    }
  }, [user, compteurId]);

  // Filtrage des données
  useEffect(() => {
    const filterData = () => {
      const today = new Date();
      let startDate = new Date();

      switch (selectFilter) {
        case "week":
          startDate.setDate(today.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(today.getMonth() - 1);
          break;
        case "year":
          startDate.setFullYear(today.getFullYear() - 1);
          break;
        default:
          startDate = new Date(0);
      }

      return consommationData.filter((conso) => {
        const consoDate = new Date(conso.created_at);
        return consoDate >= startDate;
      });
    };

    if (consommationData.length > 0) {
      const result = filterData();
      setFilteredData(result);
    }
  }, [selectFilter, consommationData]);

  // Formatage des données pour les graphiques
  const datesConsommation = filteredData.map((conso) =>
    new Date(conso.created_at).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
    })
  );

  const consommation_fcfa = filteredData.map((conso) => conso.consommation_fcfa);

  const generateYAxis = (data: number[]) => {
    if (data.length === 0) return [0, 10, 20, 30, 40, 50]; // Valeurs par défaut
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    
    // Calcul des intervalles dynamiques
    const range = maxValue - minValue;
    const step = Math.ceil(range / 5); // 5 intervalles
    const steps = Array.from({length: 6}, (_, i) => Math.round(minValue + (i * step)));
    
    return steps.filter((v, i, arr) => i === 0 || v !== arr[i - 1]); // Évite les doublons
  };

    return(
        <div className="flex flex-col gap-2">
            <div className="flex justify-between px-5 py-1">
              <div className="flex gap-1 px-5 justify-center items-center">
                <span>Statistiques</span>
                {chart === 1 && <Image onClick={()=> setChart(2)} src="/icons/stats1.svg" alt="line-icon" width={22} height={22} className="border rounded-full p-1 cursor-pointer bg-cloudGray"/>}
                {chart === 2 && <Image onClick={()=> setChart(1)} src="/icons/stats2.svg" alt="line-icon" width={22} height={22} className="border rounded-full p-1 cursor-pointer bg-cloudGray"/>}
              </div>
              <div className="flex gap-3 justify-center items-center">
                <Select 
                                  setValue={setSelectFilter} 
                                  value={selectFilter}  
                                  name="date" 
                                  options={[
                                    { name: "Cette semaine", value: "week" },
                                    { name: "Ce mois", value: "month" },
                                    { name: "Cette année", value: "year" }
                                  ]} 
                                />
                {chart === 1 && <Image onClick={()=> setChart(2)} src="/icons/stats1.svg" alt="line-icon" width={22} height={22} className="border rounded-full p-1 cursor-pointer bg-cloudGray"/>}
                {chart === 2 && <Image onClick={()=> setChart(1)} src="/icons/stats2.svg" alt="line-icon" width={22} height={22} className="border rounded-full p-1 cursor-pointer bg-cloudGray"/>}


              </div> 
            </div>
            <div className="px-2 md:px-4 overflow-x-auto flex-1">
                <div className="min-w-[300px] w-[500px]">
                    {chart === 1 && (
                        <LineChart 
                            consommation_fcfa={consommation_fcfa} 
                            dates={datesConsommation} 
                            width="500" 
                            height="190"
                            yAxis={generateYAxis(consommation_fcfa)}
                        />
                    )}
                    {chart === 2 && (
                        <BarChart 
                            consommation_fcfa={consommation_fcfa}  
                            dates={datesConsommation} 
                            width="500" 
                            height="190"
                            yAxis={generateYAxis(consommation_fcfa)}
                        />
                    )}
                </div>
            </div>

        </div>
    )

}

