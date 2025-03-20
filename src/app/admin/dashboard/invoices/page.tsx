

"use client";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Dashboard from "@/components/DashboardComponent";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Button from "@/components/buttonBlue";
import InputDate from "@/components/forms/InputDate";
import Select from "@/components/forms/Select";
import Invoice from "@/components/Invoices/Invoice";
import Table from "@/components/tables/Table";
import Tr from "@/components/tables/Tr";
import InvoiceTableRows from "@/components/Invoices/InvoiceTableRow";
import { getUser } from "@/app/(auth)/login/action";
import { calculerFacturePredire, calculerFacturesPeriodesPassees, factureAllPeriode } from "@/actions";
import { facturesProps, userProps } from "@/types";
import InvoiceTableRowGroup from "@/components/Invoices/InvoiceTableRowGroup";
import InvoiceTable from "@/components/Invoices/InvoiceTable";
import Loading from "@/components/Loading";

export default function Invoices() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<userProps | null>(null);
  const [allPeriode, setAllPeriode] = useState<string[]>([]);
  const [compteurId, setCompteurId] = useState<number>();
  const [allCompteur, setAllCompteur] = useState<{ name: string; value: number }[]>([]);
  const [allFactures, setAllFactures] = useState<facturesProps[]>([]);
  const [sortedFactures, setSortedFactures] = useState<facturesProps[]>([]);
  const [indexDepart, setIndexDepart] = useState<string>("");
  const [indexArrivee, setIndexArrivee] = useState<string>("");
  const [Message, setMessage] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [facture, setFacture] = useState<facturesProps>();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortFilter, setSortFilter] = useState<string>('default');

  useEffect(() => {
    setCurrentPage(1);
  }, [compteurId, sortFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
        if (data) {
          setUser(data);
          setAllCompteur(data.client?.compteur || []);
        }

        if (data?.client_id) {
          const compteurIdDefault = compteurId ? compteurId : data?.client?.compteur[0]?.id.toString();
          const periodes = await factureAllPeriode(data.client_id, Number(compteurIdDefault));
          const factures = await calculerFacturesPeriodesPassees(data.client_id, Number(compteurIdDefault), periodes);

          
          // Tri initial par période croissante
          const sortedByDate = factures.sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          
          setAllFactures(sortedByDate);
          setSortedFactures(sortedByDate);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [compteurId]);

  useEffect(() => {
    let sorted = [...allFactures];
    
    switch(sortFilter) {
      case 'highest':
        sorted.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case 'lowest':
        sorted.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
      case 'period':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      default:
        sorted = [...allFactures];
    }
    
    setSortedFactures(sorted);
  }, [sortFilter, allFactures]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFactures.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedFactures.length / itemsPerPage);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(indexDepart === "" || indexArrivee === ""){
      setMessage("Veuillez entrer un index valide");
      return;
    }

    const predire = await calculerFacturePredire(indexDepart, indexArrivee);

    if(indexDepart > indexArrivee){
      setMessage("L'index de départ doit être inférieur à celui de fin");
      return;
    }

    if(indexDepart === indexArrivee){ 
      setMessage("L'index est invalide");
      return;
    }

    if(predire.totalFacture === 0){
      setMessage("L'index est invalide");
      return;
    }

    setMessage("");
    setTotalAmount(predire.totalFacture);
  };

  if(loading) return <Loading />;

  if (!toggle) return (
    <Dashboard>
      <div className="flex flex-col md:flex-row gap-5 h-full md:p-0">
        {/* Section Prédiction de facture */}
        <div className="h-full bg-white w-full md:w-[40%] flex flex-col p-2 md:p-4 gap-3 md:gap-6 rounded-lg">
        <h1 className="text-lg text-midnightblue font-semibold text-center md:ml-20 mt-2">Prédire ma facture</h1>
          <div className="flex flex-col justify-center items-center mt-0 gap-3 md:gap-5">
          {Message &&             <p className="text-center text-red-500">{Message}</p>}
            <Form width="w-[250px]" onSubmit={handleSubmit}>
              <Input value={indexDepart} setValue={setIndexDepart} name="ancienIndex" label="Ancien index" placeholder="Entrer l’index" />
              <Input value={indexArrivee} setValue={setIndexArrivee} name="nouvelIndex" label="Nouveau index" placeholder="Entrer l’index" />
              <div className="mt-8">
                <Button
                tton name="Prédire ma facture" icon="white-invoice" width="w-full px-4 md:w-auto" />
              </div>
            </Form>
            <div className="text-center bg-cloudGray w-full md:w-[250px] py-3 rounded-sm text-midnightblue">
              <span className="text-2xl md:text-4xl">{totalAmount}</span>
              <span> FCFA</span>
            </div>
          </div>
        </div>

        {/* Section Mes Factures */}
        <div className="h-full bg-white flex-1 flex flex-col px-2 md:px-8 py-3 gap-3 md:gap-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center mt-3 justify-between">
            <h1 className="text-lg text-midnightblue font-semibold">Mes factures</h1>
            
            <div className="flex items-center gap-3 flex-wrap justify-end">
              <Select 
                setValue={setSortFilter} 
                value={sortFilter} 
                name="filter" 
                options={[
                  { name: 'Trier par', value: 'default' },
                  { name: 'Montant ▲', value: 'highest' },
                  { name: 'Montant ▼', value: 'lowest' },
                  { name: 'Période', value: 'period' }
                ]} 
                className="w-[140px]"
              />

              <Select 
                setValue={setCompteurId} 
                value={compteurId} 
                name="compteur" 
                options={allCompteur} 
              />
              
              {sortedFactures.length > itemsPerPage && (
                <div className="flex items-center gap-2 bg-cloudGray px-3 py-1 rounded-lg">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-1 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>

                  <span className="text-sm text-midnightblue">
                    Page {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Liste des factures */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-3 w-full overflow-x-auto">
            {currentItems.length === 0 ? (
              <p className="text-center text-nowrap w-full">Aucune facture disponible.</p>
            ) : (
              currentItems.map((index) => (
                <Invoice 
                  key={index.dateRange} 
                  setToggle={setToggle} 
                  facture={index} 
                  setFacture={setFacture} 
                  periode={index.date} 
                  prix={index.totalAmount} 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );

  if(toggle) return (
    <Dashboard>
      <InvoiceTable
        dateRange={facture?.dateRange}
        date={facture?.date}
        section1Data={facture?.section1Data}
        section1Value={facture?.section1Value}
        section2Data={facture?.section2Data}
        section2Value={facture?.section2Value}
        section3Data={facture?.section3Data}
        totalAmount={facture?.totalAmount}
        setToggle={setToggle}
      />
    </Dashboard>
  );
}



