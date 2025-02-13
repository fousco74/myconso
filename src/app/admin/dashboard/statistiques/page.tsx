import LineChart from "@/components/charts/LineChart"
import Dashboard from "@/components/DashboardComponent"
import Filter from "@/components/Filter"
import Select from "@/components/forms/Select"
import PieChart from "@/components/charts/PieChart"
import EmpruntCarbone from "@/components/EmpruntCarbone"
import ProgressBar from "@/components/ProgressBare"


export default function Statistique(){
    return(
       <Dashboard>

           <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                    <div className="flex bg-white p-4 rounded-lg justify-end">
                        <Filter />
                    </div>
                    <div className="flex bg-white p-4 rounded-lg justify-end">
                        <LineChart height="350" width="610"/>
                    </div>
                    <div className="flex bg-white p-4 rounded-lg justify-end">
                        <LineChart height="350" width="610"/>
                    </div>
                    <div className="flex bg-white p-4 rounded-lg justify-end">
                        <LineChart height="350" width="610"/>
                    </div>
                </div>

                <div className="flex flex-col  bg-white rounded-lg flex-1 px-5 py-2">
                    <h1 className="font-bold text-midnightblue">Reporting</h1>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-end">
                        <div className="flex flex-col justify-end items-end">
                            <Select name="date" options={[{
                                name: "Ma conso en kwh"
                            }]} />
                            <h3 className="text-[12px] text-gray-500">• Reporting de la période sélectionnée  •</h3>
                        </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="font-semibold text-midnightblue">Commentaires</h1>
                            <ul className="text-[12px] space-y-5">
                                <li>
                                    La courbe de consommation en kWh pour la période sélectionnée montre <br />une évolution globalement stable entre le 20 et le 23 janvier, avec <br />une consommation autour de 18 kWh . 
                                </li>
                                <li>
                                     Cependant, à partir du 24 janvier, une hausse notable se produit, <br />atteignant 25 kWh le 25 janvier. Cette augmentation pourrait être <br />liée à la forte chaleur ce jour-là, favorisant une utilisation accrue des <br />appareils comme les climatiseurs ou ventilateurs. 
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr />
                    <div className="flex flex-col gap-0 p-0">
                            <PieChart height="400" width="400"/>
                            <PieChart height="400" width="400"/>
                    </div>
                    <hr />

                    <div className="flex flex-col gap-3 mt-2">
                        <EmpruntCarbone />
                        <span className="text-[12px]">Votre émission de gaz à effet de serre est actuellement dans la <br />fourchette élevée. Réduisez votre consommation pour préserver la <br />planète. Chaque effort compte !</span>
                        <ProgressBar progress={75} color="bg-green-500" height="h-3" />
                        <div className="flex text-green ">
                            <span className="text-3xl font-extrabold">8.5</span>
                            <span className="text-lg self-end">co2</span>
                        </div>
                    </div>


                </div>
           </div>


       </Dashboard>
    )
}