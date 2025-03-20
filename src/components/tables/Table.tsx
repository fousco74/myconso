import Tr from "@/components/tables/Tr";
import EditDeleteModal from "@/components/EditDeleteModal"
import ButtonBlue from "@/components/ButtonBlue";
import InputDate from "@/components/forms/InputDate";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Index, userProps } from "@/types";
import { deleteIndex, updateIndex } from "@/actions";
import { getUser } from "@/app/(auth)/login/action";

interface TableProps<T> {
  children?: React.ReactNode;
  data?: T[];
  property?: (keyof T)[]; 
  setAllIndex?: React.Dispatch<React.SetStateAction<Index[]>>;
  setAllIndexFiltered?: React.Dispatch<React.SetStateAction<Index[]>>;
  onEdit?:   void;
  onDelete?: void;
  authUser?: userProps|null;
}



export default function Table<T>({ children, data = [], property, setAllIndex, setAllIndexFiltered, onDelete, onEdit, authUser }: TableProps<T>) {
  // Détecte automatiquement les colonnes si non spécifiées
  const columns = property ?? (data.length > 0 ? (Object.keys(data[0]) as (keyof T)[]) : []);


  return (
    <div className="flex flex-col gap-4 md:gap-6 mb-4 w-full bg-white py-2 md:py-4 px-4 md:px-8 rounded-lg">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-midnightblue">
        {children}
      </div>

      {/* Tableau avec défilement horizontal */}
      <div className="overflow-x-auto pb-2">
        <table className="rounded-lg border-collapse border-spacing-1 text-midnightblue w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((col, index) => (
                <th key={index} className="text-start px-2 md:px-4 lg:px-5 py-3 text-sm md:text-base capitalize">
                  {col.toString().replace("_", " ")}
                </th>
              ))}
              {authUser?.role.name == "admin" && 
                <th className="text-start px-2 md:px-5 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
            data.map((item, index) => <Tr authUser={authUser} key={index} data={item} columns={columns} onEdit={() => onEdit(item.id, item)} onDelete={() => onDelete(item)} />)
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                Aucune donnée trouvée
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
