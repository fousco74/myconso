import { calculerFacture } from "@/actions";
import { getUser } from "@/app/(auth)/login/action";
import ButtonBlue from "@/components/ButtonBlue";
import Select from "@/components/forms/Select";
import { userProps } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface InvoiceTodayProps {
    facture: number;
  }
    
    export default function InvoiceToday({facture}: InvoiceTodayProps){


               

    return (

        <div className="w-72 h-44  border bg-facture rounded-xl">
                        <div className="flex flex-col relative">
                          <span className="absolute flex flex-col top-4 right-3 items-center">
                            <Select name="date" options={[{
                              name: "Facture Nov-Déc"
                            }]} />
                            
          
                            <Link href="/admin/dashboard/invoices" className=" underline text-[12px]">
                              Voir toutes les factures
                            </Link>
                          </span>
        
                          <div className="absolute top-20 left-5 flex flex-col gap-1">
                            <div className="flex justify-normal items-start">
                              <span className="text-3xl self-end">{facture}</span>
                              <span className="text-[13px] self-end">CFA</span>
                            </div>
                            <ButtonBlue url="/admin/dashboard/invoices" icon="print" name="Prédire ma facture" />
                          </div>
                        </div>
                      </div>
    )
}   