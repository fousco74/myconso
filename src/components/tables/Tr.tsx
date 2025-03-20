import Image from "next/image";
import { formatDate, formatTime } from "@/utilities/functions";
import { userProps } from "@/types";

interface TrProps<T> {
  data: T;
  columns: (keyof T)[]; // Liste des clés à afficher
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  authUser?: userProps|null;
}



export default function Tr<T>({ data, columns, onEdit, onDelete, authUser }: TrProps<T>) {

  

  return (
    <tr className="border bg-white shadow-sm hover:bg-cloudGray">
     {columns?.map((column, index) => {
        const value = data[column];
        const isString = typeof value === "string";
        const isDateValid = isString && !isNaN(Date.parse(value));
        const colName = column.toString().toLowerCase();

        // Utilisation de created_at si la colonne est "date" ou "heure"
        const isDateColumn = colName.includes("date");
        const isTimeColumn = colName.includes("heure");
        const isRoleColumn = colName.includes("role");
        const createdAt = data["created_at"] as string; 

        return (
          <td key={index} className="p-2 border-y">
            {isDateColumn ? (
              createdAt ? <span>{formatDate(createdAt)}</span> : <span>-</span>
            ) : isTimeColumn ? (
              createdAt ? <span>{formatTime(createdAt)}</span> : <span>-</span>
            ) : isDateValid ? (
              <>
                <span>{formatDate(value)}</span>
                <br />
                <span>{formatTime(value)}</span>
              </>
            ) : isRoleColumn ? (
              <span>{value?.name}</span>
            ) : (
              <span>{String(value)}</span>
            )}
          </td>
        );
      })}
      
      {/* Actions adaptatives */}
      {authUser?.role.name == "admin" &&
        <td className="flex gap-1 md:gap-3 p-2 border-y border-r rounded-sm justify-end">
          {onEdit && (
            <button className="p-1 md:p-2 hover:bg-gray-100 rounded">
              <Image 
                src="/icons/edit.svg" 
                alt="edit" 
                width={16} 
                height={16}
                className="md:w-5 md:h-5" 
              />
            </button>
          )}
          {onDelete && (
            <button className="p-1 md:p-2 hover:bg-gray-100 rounded">
              <Image 
                src="/icons/delete.svg" 
                alt="delete" 
                width={16} 
                height={16}
                className="md:w-5 md:h-5" 
              />
            </button>
          )}
        </td>
      } 
    </tr>
  );
}
