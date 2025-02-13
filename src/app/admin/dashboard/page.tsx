"use client"
import Image from "next/image";
import Select from "@/components/forms/Select";

import IndexTracker from "@/components/IndexTracker";

import MeterCard from "@/components/MeterCard";
import Link from "next/link";
import EmpruntCarbone from "@/components/EmpruntCarbone"

import ButtonBlue from "@/components/buttonBlue";
import LineChart from "@/components/charts/LineChart";
import Dashboard from "@/components/DashboardComponent";



export default  function Home() {
 
  return (
    
    <Dashboard>

<div className="flex-1 text-white flex gap-3">
            <div className="flex flex-col gap-2">
              <div className="rounded-xl w-52 h-60 border p-4 bg-notif1 flex flex-col items-center">
                <div className="flex gap-6 text-base font-semibold justify-between items-center">
                  <div className="flex justify-between gap-2 items-center">
                    <h2 className="text-base">Notifications</h2>
                    <Image
                      src="/icons/clock.svg"
                      alt="clock"
                      width={15}
                      height={15}
                    />
                  </div>
                  <Image
                    src="/icons/valid.svg"
                    alt="clock"
                    width={25}
                    height={25}
                  />
                </div>

                <div className="self-center mt-6 text-[13px] opacity-85 flex flex-col gap-4 relative">
                  <p>
                    Un pic inhabituel a été <br />
                    détecté à 14h aujourd&apos;hui.{" "}
                  </p>
                  <p>
                    Vérifiez si un appareil <br />
                    énergivore a été utilisé.
                  </p>
                </div>
              </div>

              <div className="rounded-xl w-52 h-60 border bg-notif2 flex flex-col p-4 relative">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <h2>Ma conso en chiffres</h2>
                    <Image
                      src="/icons/clock.svg"
                      alt="clock"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>

                <span className="absolute top-16 text-4xl left-8">-10%</span>

                <div className="self-center mt-20 text-[13px] opacity-85 flex flex-col gap-2 relative">
                  <p>
                    Youpi ! votre consommation <br />
                    des 6 derniers mois a baissé !{" "}
                  </p>
                  <p>
                    Vous avez économisé <br />
                    92.350 FCFA.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="w-72 h-48 p-5 bg-white text-midnightblue border rounded-lg relative">
                <div className="flex gap-2">
                  <h3>L&apos;Index du jour</h3>
                  <Image
                    src="/icons/index.svg"
                    alt="index"
                    width={20}
                    height={20}
                  />
                </div>
                
                <div className="w-full mt-4">
                  <form action="" className="flex flex-col gap-5">
                    <div className="flex justify-between gap-4">
                      <div className="flex flex-col w-[150px]">
                        <label htmlFor="valeur">Index</label>
                        <input
                          type="text"
                          name=""
                          id="valeur"
                          placeholder="Entrer l'index"
                          className="p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="valeur">Heure</label>
                        <div className="flex gap-1  w-[90px]">
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="10"
                            className="w-1/2 p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                          />
                          :
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="30"
                            className="w-1/2 p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                          />
                        </div>
                      </div>
                    </div>
                    <ButtonBlue icon="recorded" name="Enregistrer" />
                  </form>
                </div>
              </div>
              <div className="w-72 h-44  border bg-facture rounded-xl">
                <div className="flex flex-col relative">
                  <span className="absolute flex flex-col top-4 right-3">
                    <Select name="date" options={[{
                      name: "Facture Nov-Déc"
                    }]} />
                    
  
                    <Link href="#" className=" underline">
                      Voir toutes les factures
                    </Link>
                  </span>

                  <div className="absolute top-20 left-5 flex flex-col gap-1">
                    <div className="flex justify-normal items-start">
                      <span className="text-3xl self-end">85.250F</span>
                      <span className="text-[13px] self-end">CFA</span>
                    </div>
                    <ButtonBlue icon="print" name="Prédire ma facture" />
                  </div>
                </div>
              </div>

              <div className="w-72 h-28  flex justify-between  bg-white border rounded-lg">
                <div className="flex flex-col py-2 px-4">
                  <Image
                    src="/icons/carbon-icon.svg"
                    alt="carbon-icon"
                    width={80}
                    height={80}
                    className="relative"
                  />
                  <div className="flex text-green  absolute bottom-10 ">
                    <span className="text-3xl font-extrabold">8.5</span>
                    <span className="text-lg self-end">co2</span>
                  </div>
                </div>

                <div className="flex flex-col  mt-1 space-y-1 text-midnightblue">
                  <EmpruntCarbone />
                  <div className="flex gap-1">
                    <p className="text-[12px]">
                      Bon ration, continuez ! <br />
                      Merci pour la Planète !
                    </p>
                    <Image
                      src="/icons/info.svg"
                      alt="emprunt-carbon-icone"
                      className="self-start"
                      width={10}
                      height={10}
                    />
                  </div>
                  <div className="mt-3">
                    <Link
                      href="#"
                      className="ml-10  opacity-75 underline text-[10px]"
                    >
                      En savoir plus +
                    </Link>
                  </div>
                </div>
              </div>

            </div>

              {/* last part */}
            <div className="flex flex-col space-y-4 flex-1">

                    {/* top */}
                    <div className="flex h-1/2 w-full text-black  gap-3">
                      {/* left */} 
                      <div className="flex flex-col w-1/2 gap-2">
                          <div className="flex h-[47%] gap-2 w-full border">
                            <MeterCard icon="subscription" subTitle="Standard Particulier" title="Abonnement" color="bluegradient" />
                            <MeterCard icon="meter" subTitle="Type A545B5" title="Compteur" color="whiteBlue"/>               
                          </div>
                          <IndexTracker />
                      </div>
                      {/* right */}
                      <div className="w-1/2 bg-white rounded-lg p-2">
                          <div className="flex gap-6">
                                <Image src="/icons/times/clouds.svg" alt="time-icon" width={80} height={80} />
                            <div className="flex flex-col text-[12px]">
                                <div className="flex gap-2 ">
                                  <h3 className="font-bold text-midnightblue text-base">Météo</h3>
                                  <Image src="/icons/weatherBold.svg" alt="time-icon" width={15} height={15} />
                                </div>
                                <div className="flex gap-1">
                                  <h5>Ce temps est susceptible <br />de faire baisser votre <br />consommation !</h5>
                                  <Image src="/icons/info.svg" alt="time-icon" width={15} height={15} className="self-start"/>
                                </div>
                            </div>
                          </div>
                          <div className="flex flex-col px-2">
                            <div className="flex text-midnightblue">
                                  <span className="text-4xl">25°</span>
                                  <span className="text-xl self-center">C</span>
                            </div>
                            <div className="flex gap-2  items-center">
                                <Image src="/icons/weather.svg" alt="time-icon" width={15} height={15} />
                                <span>Nuagueux</span>
                            </div>
                          </div>

                          <hr className="my-2"/>
                          <div className="flex gap-2  items-center text-midnightblue text-opacity-80 px-2">
                                <Image src="/icons/location.svg" alt="time-icon" width={15} height={15} />
                                <span>Abidjan, CI</span>
                          </div>
                          <div className="flex gap-2  items-center text-midnightblue text-opacity-80 px-2">
                                <Image src="/icons/calandar.svg" alt="time-icon" width={15} height={15} />
                                <span>25 Janvier 2025, 10:05</span>
                          </div>

                      </div>
                    </div>

                    {/* bottom */}
                    <div className="flex flex-col   h-1/2 w-full bg-white rounded-lg text-midnightblue">
                        <div className="flex justify-between px-5 py-1">
                          <div className="flex gap-1 px-5 justify-center items-center">
                              <span>Statistiques</span>
                              <Image src="/icons/stats.svg" alt="stat-icon" width={15} height={15}/>
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


                </div>

          </div>

    </Dashboard>
        
    
  );
}
