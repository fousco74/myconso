"use client"
import Image from "next/image";
import Select from "@/components/forms/Select";

import IndexTracker from "@/components/Index/IndexTracker";
import CarboneFinger from "@/components/Invoices/EmpruntCarbone/CarboneFinger";
import MeterCard from "@/components/MeterCard";
import { getLastIndex } from "@/actions";

import LineChart from "@/components/charts/LineChart";
import Dashboard from "@/components/DashboardComponent";
import {  useEffect, useState, useTransition } from "react";
import { calculerFacture } from "@/actions";
import { userProps } from "@/types";
import { useRouter } from "next/navigation";
import { IndexToday } from "@/components/Index/IndexToday";
import Advice from "@/components/Notifications/Advice";
import MyConso from "@/components/Notifications/MyConso";
import InvoiceToday from "@/components/Invoices/InvoiceToday";
import Weather from "@/components/weather/weather";
import Stats from "@/components/statistiques/Stats";
import { getUser } from "@/app/(auth)/login/action";





export default  function Home() {

  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000); 
  
    return () => clearInterval(interval); 
  }, []);

const [user, setUser] = useState<userProps|null>(null)
  const [facture, setFacture] = useState<number>(0)
  const [isPending, startTransition] = useTransition()
  const [compteurId, setCompteurId] = useState<string>("1")
  const [valeur_kw, setValeur_kw] = useState<string>("")
  const [loading, setLoading] = useState(true);

  const [lastIndex, setLastIndex] = useState(0);




useEffect(() => {
    
        
        getUser()
          .then( async (data) => {
            setUser(data);
           
            if(data?.id){
              getLastIndex(data?.id, parseInt(compteurId)).then(res => {
                if(res?.valeur_kw) setLastIndex(res?.valeur_kw)
             })
              await calculerFacture(data.id, parseInt(compteurId)).then((facture) => {
                 console.log("facture ",facture);
                 setFacture(facture?.totalFacture)
                 }).catch((error) => {
                   console.error('Error fetching user data:', error);
                 })
             }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          })
          .finally(() => {
            setLoading(false);
          });
    
          
    
      }, []);
  

  
  

  if (loading) return <div>Loading...</div>;


  return (
      
    <Dashboard>

<div className="flex-1 text-white flex gap-3">

            <div className="flex flex-col gap-2">
                <Advice />
                <MyConso />
            </div>

            <div className="flex flex-col justify-between">
              <IndexToday setLastIndex={setLastIndex} setFacture={setFacture} setCompteurId={setCompteurId}  compteurId={compteurId}   user={user} />
              <InvoiceToday  facture={facture} />
              <CarboneFinger />
            </div>

            <div className="flex flex-col space-y-4 flex-1">

                    <div className="flex h-1/2 w-full text-black  gap-3">
                      <div className="flex flex-col w-1/2 gap-2">
                          <div className="flex h-[47%] gap-2 w-full border">
                            <MeterCard icon="subscription" subTitle="Standard Particulier" title="Abonnement" color="bluegradient" />
                            <MeterCard icon="meter" subTitle="Type A545B5" title="Compteur" color="whiteBlue"/>               
                          </div>
                          <IndexTracker lastIndex={lastIndex} />
                      </div>
                      <Weather />
                    </div>

                    <div className="flex flex-col   h-1/2 w-full bg-white rounded-lg text-midnightblue">
                        <Stats />
                    </div>


                </div>

          </div>

    </Dashboard>
        
    
  );
}
