"use client";
import React, { useEffect, useState } from "react";

interface Props {
  indexDate?: string;
  setIndexDate?: React.Dispatch<React.SetStateAction<string>>;
  max?: string;
  min?: string;
}

export default function InputDate({ indexDate, setIndexDate, max, min }: Props) {
  const [error, setError] = useState<string | null>(null);

  // Vérifie si la date est valide lors d'un changement
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    
    if (min && newDate < min) {
      setError(`La date ne peut pas être avant ${min}`);
      return;
    }

    if (max && newDate > max) {
      setError(`La date ne peut pas dépasser ${max}`);
      return;
    }

    setError(null);
    if (setIndexDate) {
      setIndexDate(newDate);
    }
  };

  // Vérifie si indexDate est hors des limites et le corrige
  useEffect(() => {
    if (indexDate) {
      if (min && indexDate < min) {
        setIndexDate?.(min);
      }
      if (max && indexDate > max) {
        setIndexDate?.(max);
      }
    }
  }, [indexDate, min, max, setIndexDate]);

  return (
    <div className="w-full">
      <div className="bg-cloudGray p-0 border rounded w-full">
        <input
          type="date"
          value={indexDate || ""}
          onChange={handleDateChange}
          max={max}
          min={min}
          className="p-2 py-1 outline-none bg-cloudGray w-full border rounded"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
