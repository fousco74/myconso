"use client";
import { Index } from "@/types";
import InputDate from "./forms/InputDate";
import { useState, useMemo, useEffect } from "react";

interface FilterProps<T extends Index> {
  setAllIndexFiltered: React.Dispatch<React.SetStateAction<T[]>>;
  children?: React.ReactNode;
  allIndex: T[];
  selectFilter?: string;
  selectedYear?: Date;
}

export default function Filter<T extends Index>({
  setAllIndexFiltered,
  children,
  allIndex,
  selectFilter,
  selectedYear = new Date() // Valeur par défaut
}: FilterProps<T>) {
  // Calcul initial de l'année
  const selectedYearInt = parseInt(selectedYear?.toString()) || new Date().getFullYear();
  
  // Calcul des bornes annuelles
  const yearStart = new Date(selectedYearInt, 0, 1);
  const yearEnd = new Date(selectedYearInt, 11, 31);

  // États des dates
  const [startDate, setStartDate] = useState<Date>(yearStart);
  const [endDate, setEndDate] = useState<Date>(yearEnd);

  // Mise à jour des dates quand l'année change
  useEffect(() => {
    setStartDate(yearStart);
    setEndDate(yearEnd);
  }, [selectedYearInt]);

  // Gestion des filtres prédéfinis
  useEffect(() => {
    let newStart = yearStart;
    let newEnd = yearEnd;

    switch (selectFilter) {
      case "week":
        const janFirst = new Date(selectedYearInt, 0, 1);
        const firstMonday = new Date(janFirst);
        firstMonday.setDate(janFirst.getDate() + ((1 - janFirst.getDay() + 7) % 7));
        newStart = firstMonday;
        newEnd = new Date(firstMonday);
        newEnd.setDate(firstMonday.getDate() + 6);
        break;

      case "month":
        newStart = new Date(selectedYearInt, 0, 1);
        newEnd = new Date(selectedYearInt, 0, 31);
        break;
    }

    // Limitation dans l'année
    if (newStart < yearStart) newStart = yearStart;
    if (newEnd > yearEnd) newEnd = yearEnd;

    setStartDate(newStart);
    setEndDate(newEnd);
  }, [selectFilter, selectedYearInt]);

  const filteredData = useMemo(() => {
    return allIndex.filter(item => {
      const itemDate = new Date(item.created_at);
      return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
    });
  }, [allIndex, startDate, endDate]);

  useEffect(() => {
    setAllIndexFiltered(filteredData);
  }, [filteredData]);


  // Rendu des InputDate corrigé
  return (
    <div className="flex max-md:flex-wrap gap-4 md:gap-5 items-center justify-center text-midnightblue">
      {children}
      <div className="flex gap-1 items-center">
        <span>Du</span>
        <InputDate
          indexDate={startDate.toISOString().split("T")[0]}
          setIndexDate={(date) => 
            setStartDate(date ? new Date(date) : new Date(yearStart))
          }
          min={yearStart.toISOString().split("T")[0]}
          max={yearEnd.toISOString().split("T")[0]}
        />
      </div>
      <div className="flex gap-1 items-center">
        <span>Au</span>
        <InputDate
          indexDate={endDate.toISOString().split("T")[0]}
          setIndexDate={(date) => 
            setEndDate(date ? new Date(date) : new Date(yearEnd))
          }
          min={startDate.toISOString().split("T")[0]}
          max={yearEnd.toISOString().split("T")[0]}
        />
      </div>
    </div>
  );
}