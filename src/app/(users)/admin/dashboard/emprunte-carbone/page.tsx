"use client"

import Dashboard from "@/components/DashboardComponent";
import Filter from "@/components/Filter";
import Image from "next/image";
import Select from "@/components/forms/Select";
import CircleProgress from "@/components/charts/CircleProgressBar";


export default function emprunteCarbone() {

    return (

        <Dashboard>

            <div className="flex-1 flex gap-3 justify-between   max-md:flex-col">
                <div className="gap-2 w-[80%] bg-red-500 ">
                    <div className="flex justify-between gap-6 p-4">
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg text-black">Empreinte Carbone</h1>
                            <Image src="/icons/empreinte-carbone.svg" alt="index-icon" width={25} height={25} />
                        </div>
                        <Filter >
                            <Image src="/icons/filter.svg" alt="filter-icon" width={25} height={25} className="cursor-pointer" />
                            <Select name="date" options={[{
                                name: "Cette semaine",
                                value: "7"
                            },
                            {
                                name: "Ce mois",
                                value: "30"
                            },
                            {
                                name: "Cette année",
                                value: "360"
                            }
                            ]} />
                        </Filter>
                    </div>
                    <div className="w-full flex justify-between">
                            <div className="flex flex-col gap-3">
                                <CircleProgress value={33} />
                                <span>Bon ration, continuez !<br />La Planète vous remercie !</span>
                            </div>
                    </div>

                </div>


                {/* Commentaires */}
                <div className="flex w-[350px]  flex-col gap-2 p-4 bg-red-500">
                    <h2 className="text-lg lg:text-xl font-semibold text-midnightblue">
                        Commentaires
                    </h2>
                    <ul className="text-xs lg:text-sm space-y-2">
                        <li>
                            La courbe de consommation en kWh pour la période sélectionnée montre une évolution globalement stable entre le 20 et le 23 janvier, avec une consommation autour de 18 kWh.
                        </li>
                        <li>
                            Cependant, à partir du 24 janvier, une hausse notable se produit, atteignant 25 kWh le 25 janvier. Cette augmentation pourrait être liée à la forte chaleur ce jour-là, favorisant une utilisation accrue des climatiseurs ou ventilateurs.
                        </li>
                    </ul>
                </div>



            </div>

        </Dashboard >


    );
}
