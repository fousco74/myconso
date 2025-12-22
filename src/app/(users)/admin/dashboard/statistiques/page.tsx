"use client";
import LineChart from "@/components/charts/LineChart";
import Dashboard from "@/components/DashboardComponent";
import Filter from "@/components/Filter";
import Select from "@/components/forms/Select";
import PieChart from "@/components/charts/PieChart";
import EmpruntCarbone from "@/components/Invoices/EmpruntCarbone/EmpruntCarbone";
import ProgressBar from "@/components/ProgressBare";
import { useEffect, useState } from "react";
import { getUser } from "@/app/(auth)/login/action";
import Image from "next/image";
import BarChart from "@/components/charts/BarChart";
import { calculerFacturesPeriodesPassees, factureAllPeriode } from "@/actions";
import { calculateConsumptionPercentage } from "@/utilities/functions";
import Loading from "@/components/Loading";

import { useAuth } from "../../../../../../Store/auth";

export default function Statistique() {
  const todayStr = new Date().toISOString().split("T")[0];

  // États principaux
  const {user, setUser} = useAuth();
  const [consommationData, setConsommationData] = useState<object[]>([]);

  // États de filtres pour les graphiques
  const [selectFilter1, setSelectFilter1] = useState<string>("week");
  const [selectFilter2, setSelectFilter2] = useState<string>("week");
  const [selectFilter3, setSelectFilter3] = useState<string>("week");

  // États des graphiques (sélection du type d'affichage)
  const [chart1, setChart1] = useState<number>(1);
  const [chart2, setChart2] = useState<number>(1);
  const [chart3, setChart3] = useState<number>(1);

  // États de consommation pour kWh & FCFA et dates associées
  const [consommation_kw, setConsommation_kw] = useState<number[]>([]);
  
  const [consommation_FCFA, setConsommation_FCFA] = useState<number[]>([]);
 
  const [consommation_date_kw, setConsommation_date_kw] = useState<string[]>([]);
  const [consommation_date_FCFA, setConsommation_date_FCFA] = useState<string[]>([]);
  const [originalFactureParPeriode, setOriginalFactureParPeriode] = useState<object[]>([]);
  const [facture_par_periode_dates, setFacture_par_periode_dates] = useState<string[]>([]);
  const [facture_par_periode_values, setFacture_par_periode_values] = useState<number[]>([]);


  
  const [consoParPeriodeKW, setConsoParPeriodeKW] = useState<object[]>([]);
  const [consoParPeriodeFCFA, setConsoParPeriodeFCFA] = useState<object[]>([]);

  // Autres états
  const [compteurId, setCompteurId] = useState<number>("");
  const [allCompteur, setAllCompteur] = useState<object[]>([]);
  const [allPeriodes, setAllPeriodes] = useState<{ name: string; value: string }[]>([]);
  const [allConsommation, setAllConsommation] = useState<object[]>([]);
  const [selectedYear, setSelectedYear] = useState<Date>(new Date().getFullYear());
const [availableYears, setAvailableYears] = useState<number[]>([]);


const filterData = (filterValue: string, selectedYear: number) => {
  let startDate: Date;
  let endDate: Date;
  const today = new Date();
  const yearEnd = new Date(selectedYear, 11, 31); // 31 Décembre de selectedYear

  switch (filterValue) {
    case "week":
      // Dernière semaine complète de l'année sélectionnée
      endDate = new Date(yearEnd);
      endDate.setHours(23, 59, 59, 999);
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 6); // 7 jours avant
      startDate.setHours(0, 0, 0, 0);
      break;

    case "month":
      if (selectedYear === today.getFullYear()) {
        // Si l'année sélectionnée est l'année actuelle => dernier mois à partir d'aujourd'hui
        endDate = new Date(today);
        endDate.setHours(23, 59, 59, 999);
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        startDate.setDate(today.getDate()); // Même jour du mois précédent
        startDate.setHours(0, 0, 0, 0);
      } else {
        // Si l'année est passée ou future => dernier mois entier de cette année
        endDate = new Date(selectedYear, 11, 31); // 31 Décembre de selectedYear
        endDate.setHours(23, 59, 59, 999);
        startDate = new Date(selectedYear, 10, 1); // 1er Novembre de selectedYear
        startDate.setHours(0, 0, 0, 0);
      }
      break;

    case "year":
      // Toute l'année sélectionnée
      startDate = new Date(selectedYear, 0, 1);
      endDate = new Date(selectedYear, 11, 31);
      endDate.setHours(23, 59, 59, 999);
      break;

    default:
      // Si aucun filtre spécifique, prendre toute l'année par défaut
      startDate = new Date(selectedYear, 0, 1);
      endDate = new Date(selectedYear, 11, 31);
      endDate.setHours(23, 59, 59, 999);
  }

  return consommationData.filter((conso) => {
    const consoDate = new Date(conso.created_at);
    return (
      consoDate >= startDate &&
      consoDate <= endDate &&
      conso.compteur_id === compteurId
    );
  });
};


// Reset des filtres quand l'année change
useEffect(() => {
  setSelectFilter1('year');
  setSelectFilter2('year');
}, [selectedYear]);


// useEffect pour le premier filtre
useEffect(() => {
  if (consommationData.length > 0) {
    const consoFiltered = filterData(selectFilter1, parseInt(selectedYear.toString()));
    
    setConsommation_kw(consoFiltered.map(conso => conso.consommation_kw));
    setConsommation_date_kw(
      consoFiltered.map(conso => 
        new Date(conso.created_at).toLocaleDateString("fr-FR", { 
          day: "2-digit", 
          month: "short" 
        })
      )
    );
  }
}, [selectFilter1, consommationData, compteurId, selectedYear]);


// useEffect pour le deuxième filtre
useEffect(() => {
  if (consommationData.length > 0) {
    const consoFiltered = filterData(selectFilter2, parseInt(selectedYear.toString()));
    
    setConsommation_FCFA(consoFiltered.map(conso => conso.consommation_fcfa));
    setConsommation_date_FCFA(
      consoFiltered.map(conso => 
        new Date(conso.created_at).toLocaleDateString("fr-FR", { 
          day: "2-digit", 
          month: "short" 
        })
      )
    );
  }
}, [selectFilter2, consommationData, compteurId, selectedYear]);


useEffect(() => {
  if (originalFactureParPeriode.length > 0) {
    const filtered = filterFactureByYear(originalFactureParPeriode, Number(selectedYear));
    
    // Mettre à jour les données du graphique 3
    setFacture_par_periode_values(filtered.map(p => parseInt(p.totalAmount)));
    setFacture_par_periode_dates(filtered.map(p => p.date));
    
  }
}, [selectedYear, originalFactureParPeriode]);



  // Récupération des données utilisateur et des indices
  useEffect( () => {
    
     async function fetchData(){
        const compteurIdDefault = user?.client?.compteur[0].id;

        console.log("compteurIdDefault :", compteurIdDefault);
        if (user?.client.index) {
          setAllCompteur(user?.client.compteur);
          setCompteurId(Number(compteurIdDefault));
          setConsommationData(user?.client.consommation.filter((conso) => conso.compteur_id === compteurIdDefault));
          setAllConsommation(user?.client.consommation.filter((conso)=> conso.compteur_id === compteurIdDefault));
        }

        console.log("user client_id ::",user?.client_id)
        const periodes = await  factureAllPeriode(Number(user?.client_id), Number(compteurIdDefault));
        const facture_par_periode = await calculerFacturesPeriodesPassees(
          user?.client_id, 
          Number(compteurIdDefault), 
          periodes
        );
  
        // Stocker les données originales
        setOriginalFactureParPeriode(facture_par_periode);


         setAllPeriodes(periodes);
        const consoPeriodes = await calculateConsumptionPercentage(periodes, user?.client.consommation.filter((conso) => conso.compteur_id === compteurIdDefault), compteurIdDefault);
        const consoPeriodesFCFA = await calculateConsumptionPercentage(periodes, user?.client.consommation.filter((conso) => conso.compteur_id === compteurIdDefault), compteurIdDefault, true);
       
        setConsoParPeriodeKW(consoPeriodes);
        setConsoParPeriodeFCFA(consoPeriodesFCFA);


        const currentYear = new Date().getFullYear(); // Ajout de la définition


        
        // Correction de l'extraction des années
const years = periodes?.flatMap(p => {
  // Séparation des dates début/fin
  const [start, end] = p.value.split(' - ');
  // Extraction année début (position 2 après split '/')
  const startYear = parseInt(start.split('/')[2]);
  // Extraction année fin
  const endYear = parseInt(end.split('/')[2]);
  return [startYear, endYear];
})
  .filter((year, index, self) => {
    // Filtrage des doublons
    return self.indexOf(year) === index;
  })
  .sort((a, b) => b - a)


     if(years){
        setAvailableYears(years);
      setSelectedYear(years?.includes(currentYear) ? currentYear : years[0]);
     }
      
     
    }

        
fetchData();

     
  }, [user?.client_id]);


  useEffect(() => {
    
    setConsommationData(allConsommation.filter((conso) => conso.compteur_id === compteurId));
    setAllConsommation(allConsommation.filter((conso)=> conso.compteur_id === compteurId));
    setConsoParPeriodeKW(
      calculateConsumptionPercentage(allPeriodes, allConsommation, compteurId)
    );
    setConsoParPeriodeFCFA(
      calculateConsumptionPercentage(allPeriodes, allConsommation, compteurId, true)
    );
  
  }, [compteurId]);

 
  // fonction de filtrage
  const filterPeriodsByYear = (periods: any[], year: number) => {
    return periods?.filter(p => {
      // Séparation des dates début et fin
      const [startDate, endDate] = p.value.split(' - ');
      
      // Extraction des années début et fin
      const startYear = parseInt(startDate.split('/')[2]);
      const endYear = parseInt(endDate.split('/')[2]);
        
      // Vérification si l'année cible est dans l'intervalle
      return startYear === year || endYear === year;
    });
  };

  const filterFactureByYear = (periods, year) => {
    return periods.filter(p => {
      // On utilise la propriété "dateRange" au format "Du dd/mm/yyyy Au dd/mm/yyyy"
      // On enlève "Du " et on découpe la chaîne sur " Au "
      const range = p.dateRange.replace('Du ', '').split(' Au ');
      if (range.length !== 2) {
        return false; // si le format n'est pas correct, on ignore cet élément
      }
      
      const [startDate, endDate] = range;
      
      // Extraction des années depuis les dates (en supposant le format dd/mm/yyyy)
      const startYear = parseInt(startDate.split('/')[2], 10);
      const endYear = parseInt(endDate.split('/')[2], 10);
      
      // On vérifie que l'année cible se situe dans l'intervalle [startYear, endYear]
      return year >= startYear && year <= endYear;
    });
  };
  




    

  if (!user)
    return (
      <Loading />
    );

  return (
    <Dashboard>
      <div className="flex flex-col  gap-4 p-2 lg:p-4">
        {/* Colonne gauche - Charts */}
        <div className="flex max-md:flex-col  gap-4 lg:gap-8 w-full lg:w-2/3">
          {/* Barre d'outils */}
          <div className="flex flex-col  gap-2 justify-between border  bg-white p-2 lg:p-4 rounded-lg shadow">
          <div className="flex gap-4 bg-white p-4 rounded-lg justify-end shadow">
            <Select
              setValue={setCompteurId}
              value={compteurId}
              name="compteur"
              options={allCompteur}
            />
            <Filter selectedYear={selectedYear}    setAllIndexFiltered={setConsommationData} allIndex={allConsommation} />
          </div>

          {/* Graphiques */}
{[1, 2, 3].map((chartNum) => {
  const consommation = chartNum === 1 ? consommation_kw : chartNum === 2 ? consommation_FCFA : facture_par_periode_values;
  const consommation_date = chartNum === 1 ? consommation_date_kw : chartNum === 2 ? consommation_date_FCFA : facture_par_periode_dates;
  const chartState = chartNum === 1 ? chart1 : chartNum === 2 ? chart2 : chart3;
  const setChartState = chartNum === 1 ? setChart1 : chartNum === 2 ? setChart2 : setChart3;
  const selectFilter = chartNum === 1 ? selectFilter1 : chartNum === 2 ? selectFilter2 : selectFilter3;
  const setSelectFilter = chartNum === 1 ? setSelectFilter1 : chartNum === 2 ? setSelectFilter2 : setSelectFilter3;

  // Calcul dynamique du Y-Axis
  const maxValue =  chartNum === 1 ? Math.max(...consommation_kw, 10) : chartNum === 2 ? Math.max(...consommation_FCFA, 10) : Math.max(...facture_par_periode_values, 10); // Évite max à 0
  const step = Math.ceil(maxValue / 10); // Divise en 10 intervalles
  const yAxis = Array.from({ length: 11 }, (_, i) => i * step);

  return (
    <div key={chartNum} className="bg-white p-2 lg:p-4 rounded-lg  shadow">
      <div className="flex flex-col items-center justify-between gap-2 lg:gap-3 mb-4">
        <h2 className="text-lg font-semibold text-midnightblue text-center lg:text-left">
          {chartNum === 1 ? "Ma conso en kWh" : chartNum === 2 ? "Ma conso en FCFA" : "Statistiques"}
        </h2>
        { (chartNum === 1 || chartNum === 2) && 

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <Select
            className="w-full lg:w-48"
            setValue={setSelectFilter}
            value={selectFilter}
            name="date"
            options={[
              { name: "7 derniers jours", value: "week" },
              { name: "30 derniers jours", value: "month" },
              { name: "Année", value: "year" },
            ]}
          />
          <Image
            onClick={() => setChartState(chartState === 1 ? 2 : 1)}
            src={chartState === 1 ? "/icons/stats1.svg" : "/icons/stats2.svg"}
            alt="Switch chart type"
            width={22}
            height={22}
            className="border rounded-full p-1 cursor-pointer bg-cloudGray"
          />
        </div>
         }
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[300px] w-[500px] h-[250px] lg:h-[290px]">
          {/* Graphique dynamique */}
          {chartState === 1 ? (
            <LineChart consommation_fcfa={consommation} dates={consommation_date} yAxis={yAxis} width="500" height="290" />
          ) : (
            <BarChart consommation_fcfa={consommation} dates={consommation_date} yAxis={yAxis} width="500" height="290" />
          )}
        </div>
      </div>
    </div>
  );
})}

        </div>

        {/* Colonne droite - Reporting */}
        <div className="flex flex-col  bg-white rounded-lg p-4 lg:p-6 shadow mt-4 lg:mt-0">
        <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl lg:text-2xl font-bold text-midnightblue">Reporting</h1>
              <Select
                className="w-32"
                setValue={setSelectedYear}
                value={selectedYear}
                name="year"
                options={availableYears?.map(year => ({
                  name: year,
                  value: year
                }))}
              />
            </div>
          <div className="flex flex-col gap-4">
            {/* Sélecteur période */}
            <div className="flex flex-col items-center lg:items-end">
              <h3 className="text-xs lg:text-sm text-gray-500 mt-1 text-center">
                • Reporting de la période sélectionnée •
              </h3>
            </div>

            {/* Commentaires */}
            <div className="flex flex-col gap-2">
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

            <hr className="my-2 lg:my-4" />

            {/* Pie Charts */}
            <div className="flex flex-col  gap-4 justify-around">
            <PieChart
    title="Consommation en kWh par période"
    consoParPeriode={calculateConsumptionPercentage(
      filterPeriodsByYear(allPeriodes, Number(selectedYear)),
      user?.client.consommation,
      compteurId
    )}
    height="350"
    width="350"
  />
  <PieChart
    title="Consommation en FCFA par période"
    consoParPeriode={calculateConsumptionPercentage(
      filterPeriodsByYear(allPeriodes, Number(selectedYear)),
      user?.client.consommation,
      compteurId,
      true
    )}
    height="350"
    width="350"
  />
            </div>

            <hr className="my-2 lg:my-4" />

            {/* Empreinte carbone */}
            <div className="flex flex-col gap-3">
              <EmpruntCarbone  />
              <p className="text-xs lg:text-sm text-gray-600">
              Votre émission de gaz à effet de serre est actuellement dans la fourchette élevée. Réduisez votre consommation pour préserver la planète. Chaque effort compte !
              </p>
              <ProgressBar progress={75} color="bg-green-500" height="h-3 w-full" />
              <div className="flex justify-center items-end gap-2">
              <span className="text-3xl font-extrabold text-green-500">8.5</span>
              <span className="text-lg text-green-500">CO₂</span>
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>
    </Dashboard>
  );
}
