"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useContext } from "react";
import { userProps } from "@/types";
import { UserAuth } from "../../../Hooks/UseAuth";

interface IndexTrackerProps {
  className?: string;
  lastIndex?: number;
}

export default function IndexTracker({ className, lastIndex }: IndexTrackerProps) {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const user = useContext(UserAuth);

  const Mois = [
    "janvier", "février", "mars", "avril", "mai", "juin", 
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  useEffect(() => {
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, [date]);

  // Fonction pour obtenir le nombre de jours dans un mois donné
  const getDaysInMonth = (year: number, month: number) => 
    new Date(year, month + 1, 0).getDate();

  // Génère un tableau des jours du mois actuel
  const monthDays = useMemo(() => (
    Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1)
  ), [year, month]);

  // Liste des jours indexés ce mois-ci
  const indexDates = useMemo(() => (
    user?.client?.index
      ?.map(index => new Date(index.created_at))
      .filter(date => date.getMonth() === month && date.getFullYear() === year)
      .map(date => date.toLocaleDateString("fr-FR", { day: "2-digit" }))
  ), [user, month, year]);

  return (
    <div className={`h-32 bg-white p-2 rounded-lg flex flex-col gap-4 ${className || 'w-full'}`}>
      
      {/* Titre */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-xs">
          <h1 className="font-bold text-blueGradient">Index Tracker Mensuel</h1>
          <p>Suivez vos enregistrements d&apos;index</p>
        </div>
        <span className="text-deepBlue font-bold bg-cloudGray rounded-full px-3 py-1 text-sm">
          {Mois[month]}
        </span>
      </div>

      {/* Grille des jours du mois */}
      <div className="relative flex">
        <div className="grid grid-cols-11 gap-1 absolute left-1 top-0">
          {monthDays.map(day => {
            const formattedDay = day.toString().padStart(2, "0"); // S'assure d'avoir 2 chiffres
            return (
              <span 
                key={`${year}-${month}-${day}`} 
                className={`p-1 rounded-full ${indexDates.includes(formattedDay) ? "bg-bluegradient" : "bg-midnightblue opacity-20"}`}
              ></span>
            );
          })}
        </div>

        {/* Dernier index enregistré */}
        <div className="flex flex-col absolute text-white bg-whiteBlue  p-1 rounded-lg  right-1 text-[9px]">
                    <div className="flex gap-1 ">
                        <h1>Dernier index <br />enregistré</h1>
                        <Image src="/icons/index.svg" alt="index" width={20} height={20} />
                    </div>
                    <p className="flex gap-1">
                        <span className="text-lg font-semibold">{lastIndex}</span>
                        <span className=" self-center text-[9px]">Kwh</span>
                    </p>
                </div>
      </div>

    </div>
  );
}
