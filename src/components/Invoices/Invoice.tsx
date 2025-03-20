import { facturesProps } from "@/types";
import Link from "next/link";
import { SetStateAction } from "react";

interface invoiceProps {
    prix: string;
    periode: string;
    facture: facturesProps;
    setFacture: React.Dispatch<SetStateAction<facturesProps|undefined>>;
    setToggle: React.Dispatch<SetStateAction<boolean>>
}

export default function invoice({prix, periode, setFacture, facture, setToggle}: invoiceProps){

   const showFacture = () =>{
        setFacture(facture)
        setToggle(true)
    }

    return (
        <div  className="bg-invoice w-32 h-40 relative">
                        <span className=" absolute text-[10px] text-midnightblue bottom-11 left-3 text-nowrap">{facture.periode}</span>
            <h1 className="text-[12px] absolute font-semibold text-midnightblue left-0 right-0 text-center top-3">{periode}</h1>
            <div className="text-center  text-midnightblue absolute left-0 bottom-16 right-0">
                <span className="text-md">{prix}</span>
                <span className="text-[8px]">FCFA</span>
            </div>
            <button onClick={showFacture} className="text-[10px] text-green border-green border-b bottom-7 left-10 absolute">Voir plus +</button>
        </div>
    )
}

