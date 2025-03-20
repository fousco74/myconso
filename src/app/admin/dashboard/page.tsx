"use client"
import Image from "next/image";
import Select from "@/components/forms/Select";

import IndexTracker from "@/components/Index/IndexTracker";
import CarboneFinger from "@/components/Invoices/EmpruntCarbone/CarboneFinger";
import MeterCard from "@/components/MeterCard";
import { getLastIndex } from "@/actions";

import Dashboard from "@/components/DashboardComponent";
import {  useContext, useEffect, useState, useTransition } from "react";
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
import Loading from "../../../components/Loading";
import { UserAuth } from "../../../../Hooks/UseAuth";





export default  function Home() {

const router = useRouter();

const [user, setUser] = useState<userProps|null>(null)
  const [facture, setFacture] = useState<number>(0)
  const [compteurId, setCompteurId] = useState<string>()
  const [loading, setLoading] = useState(true);
  const [periode, setPeriode] = useState<string>("");

  const [lastIndex, setLastIndex] = useState(0);

  const userAuth = useContext(UserAuth);
  const email = userAuth?.email;
  console.log(email);




useEffect(() => {
    
        
        getUser()
          .then( async (data) => {
            setUser(data);
            
            if(data?.id){
              await setCompteurId(data?.client?.compteur[0]?.id.toString())

              const compteurIdDefault = compteurId ? compteurId :  data?.client?.compteur[0]?.id.toString()

              getLastIndex(data?.client_id, Number(compteurIdDefault)).then(res => {
                if(res?.valeur_kw) setLastIndex(res?.valeur_kw)
             })
              await calculerFacture(data.client_id, Number(compteurIdDefault)).then((facture) => {
                 console.log("facture ",facture);
                 setFacture(Number(facture?.totalFacture))
                 setPeriode(facture?.periode)
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


      useEffect(() => {
        const fecthing = async () => {
             if(compteurId){
              getLastIndex(user?.client_id, Number(compteurId)).then(res => {
                if(res?.valeur_kw) setLastIndex(res?.valeur_kw)
             })
            console.log("compteur Id ",compteurId);
              await calculerFacture(user?.client_id, Number(compteurId)).then((facture) => {
                 console.log("facture ",facture);
                 setFacture(Number(facture?.totalFacture))
                 setPeriode(facture?.periode)
                 }).catch((error) => {
                   console.error('Error fetching user data:', error);
                 });
             }
            }
       fecthing();
      }, [compteurId]); 
  

  
  

  if (loading) return <Loading />;


  return (
      
    <Dashboard>

<div className="flex-1 text-white flex gap-3   max-md:flex-col max-md:justify-center">

            <div className="flex flex-col gap-2">
                <Advice />
                {userAuth?.email}
                <MyConso />
            </div>

            <div className="flex flex-col md:justify-between justify-center max-md:gap-3">
              <IndexToday setUser={setUser} setLastIndex={setLastIndex} setFacture={setFacture} setCompteurId={setCompteurId}  compteurId={compteurId}   user={user} />
              <InvoiceToday periode={periode} setFacture={setFacture} user={user} facture={facture} compteurId={compteurId} />
              <CarboneFinger />
            </div>

            <div className="flex flex-col space-y-4 flex-1">

                    <div className="flex md:h-1/2 w-full text-black  gap-3 max-md:flex-col">
                      <div className="flex flex-col md:w-1/2 gap-2">
                          <div className="flex h-36 md:h-[47%] gap-2 w-full border">
                            <MeterCard icon="subscription" subTitle="Standard Particulier" title="Abonnement" color="bluegradient" />
                            <MeterCard icon="meter" subTitle="Type A545B5" title="Compteur" color="whiteBlue"/>               
                          </div>
                          <IndexTracker user={user} lastIndex={lastIndex} />
                      </div>
                      <Weather />
                    </div>

                    <div className="flex flex-col h-1/2 w-full bg-white rounded-lg text-midnightblue">
                        <Stats compteurId={compteurId} user={user} />
                      </div>

                </div>

          </div>

    </Dashboard>
        
    
  );
}
