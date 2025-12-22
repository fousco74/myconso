// app/(users)/admin/dashboard/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@/../Store/auth"
import { getLastIndex, calculerFacture } from "@/actions"
import Dashboard from "@/components/DashboardComponent"
import Advice from "@/components/Notifications/Advice"
import MyConso from "@/components/Notifications/MyConso"
import { IndexToday } from "@/components/Index/IndexToday"
import InvoiceToday from "@/components/Invoices/InvoiceToday"
import CarboneFinger from "@/components/Invoices/EmpruntCarbone/CarboneFinger"
import MeterCard from "@/components/MeterCard"
import IndexTracker from "@/components/Index/IndexTracker"
import Weather from "@/components/weather/weather"
import Stats from "@/components/statistiques/Stats"
import Loading from "@/components/Loading"
// ... autres imports

export default function DashboardPage() {
  const { user } = useAuth()
  const [facture, setFacture] = useState<number>(0)
  const [compteurId, setCompteurId] = useState<string>()
  const [periode, setPeriode] = useState<string>("")
  const [lastIndex, setLastIndex] = useState(0)

  // Init compteurId et autres valeurs dès que user dispo
  useEffect(() => {
    if (user?.client?.compteur?.length > 0) {
      const firstCompteurId = user.client.compteur[0].id.toString()
      setCompteurId(firstCompteurId)
      getLastIndex(user.client_id, Number(firstCompteurId)).then(res => {
        if (res?.valeur_kw) setLastIndex(res.valeur_kw)
      })
      calculerFacture(user.client_id, Number(firstCompteurId)).then(facture => {
        setFacture(Number(facture?.totalFacture))
        setPeriode(facture?.periode)
      }).catch((error) => {
        console.error('Error fetching user data:', error)
      })
    }
  }, [user])

  // Maj automatique quand compteurId change
  useEffect(() => {
    if (user?.client_id && compteurId) {
      getLastIndex(user.client_id, Number(compteurId)).then(res => {
        if (res?.valeur_kw) setLastIndex(res.valeur_kw)
      })
      calculerFacture(user.client_id, Number(compteurId)).then(facture => {
        setFacture(Number(facture?.totalFacture))
        setPeriode(facture?.periode)
      }).catch((error) => {
        console.error('Error fetching user data:', error)
      })
    }
  }, [compteurId, user?.client_id])

  if (!user) return <Loading />


  return (
      
    <Dashboard>

      <div className="flex-1 text-white flex gap-3   max-md:flex-col max-md:justify-center">
           <div className="flex  flex-col gap-4">
                <Advice />
                <MyConso />
            </div>

            <div className="flex flex-col   justify-start gap-4 max-md:gap-3">
              <IndexToday  setLastIndex={setLastIndex} setFacture={setFacture} setCompteurId={setCompteurId}  compteurId={compteurId} />
              <InvoiceToday periode={periode} facture={facture} />
              <CarboneFinger />
            </div>

            <div className="flex flex-col space-y-4 flex-1">

                    <div className="flex  w-full text-black  gap-3 max-md:flex-col">
                      <div className="flex flex-col md:w-1/2 gap-2">
                          <div className="flex h-36 md:h-[47%] gap-2 w-full border">
                            <MeterCard icon="subscription" subTitle="Standard Particulier" title="Abonnement" color="bluegradient" />
                            <MeterCard icon="meter" subTitle="Type A545B5" title="Compteur" color="whiteBlue"/>               
                          </div>
                          <IndexTracker  lastIndex={lastIndex} />
                      </div>
                      <Weather />
                    </div>

                    <div className="flex flex-col py-2  w-full bg-white rounded-lg text-midnightblue">
                        <Stats compteurId={compteurId}  />
                      </div>

                </div>

      </div>

    </Dashboard>
        
    
  );
}
