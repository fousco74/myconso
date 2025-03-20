import { calculerFacture, factureAllPeriode, updateCalculerFacture } from "@/actions";
import ButtonBlue from "@/components/ButtonBlue";
import Select from "@/components/forms/Select";
import { userProps } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface InvoiceTodayProps {
    facture: number;
    periode: string;
}

export default function InvoiceToday({ facture, periode }: InvoiceTodayProps) {

   
    return (
        <div className="md:w-72 h-44 border bg-facture rounded-xl">
            <div className="flex flex-col relative">
                <span className="absolute flex flex-col top-4 right-3 items-center">
                    <span className="text-deepBlue font-bold bg-cloudGray rounded-full px-3 py-1 text-sm">
                        {periode}
                    </span>
                    <Link href="/admin/dashboard/invoices" className="underline text-[12px] mt-2">
                        Voir toutes les factures
                    </Link>
                </span>
                <div className="absolute top-20 left-5 flex flex-col gap-1">
                    <div className="flex justify-normal items-start">
                        <span className="text-3xl self-end">{facture || 0}</span>
                        <span className="text-[13px] self-end">CFA</span>
                    </div>
                    <ButtonBlue url="/admin/dashboard/invoices" icon="print" name="Prédire ma facture" width="w-[300px] md:w-[254px]" />
                </div>
            </div>
        </div>
    );
}
