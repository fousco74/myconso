"use client";
import CreateIndex from "@/components/Index/CreateIndex";
import Table from "@/components/tables/Table";
import Image from "next/image";
import Select from "@/components/forms/Select";
import Filter from "@/components/Filter";
import Dashboard from "@/components/DashboardComponent";
import { getUser } from "@/app/(auth)/login/action";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Index, userProps } from "@/types";
import EditDeleteModal from "@/components/EditDeleteModal"
import ButtonBlue from "@/components/ButtonBlue";
import InputDate from "@/components/forms/InputDate";
import { deleteIndex, updateIndex } from "@/actions";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import { useAuth } from "../../../../../../Store/auth";

export default function IndexPage(){
  

    const {user, setUser} = useAuth();
    const [allIndex, setAllIndex] = useState<Index[]>([]);
    const [allIndexFiltered, setAllIndexFiltered] = useState<Index[]>([]);
    const [selectFilter, setSelectFilter] = useState<string>("week");


    

      
      useEffect(() => {
          
              
                  
                  if(user?.client.index){
                    console.log('index user', user)

                    setAuthUser(user);
                    setAllIndex(user?.client.index) 
                    setAllIndexFiltered(user?.client.index)  
                  }

                },[user]);


            //delete and update index
            const [isOpen, setIsOpen] = useState(false);
            const [success, setSuccess] = useState<boolean>(false);
            const [valeur_kw, setValeur_kw] = useState<string>("")
            const [isPending, startTransition] = useTransition()
            const [message, setMessage] = useState<string>("");
            const [compteurId, setCompteurId] = useState<string>("1")
            const [indexDate, setIndexDate] = useState<string>(new Date().toISOString().split("T")[0]);
            const [date, setDate] = useState<Date>(new Date());
            const minutes = date.getMinutes();
            const hours = date.getHours();
            const [isOpenAction, setIsOpenAction] = useState(false)
            const [item, setItem] = useState<Index>()
            const [monthDays, setMonthDays] = useState<string>(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate().toString());
            const [authUser, setAuthUser] = useState<userProps|null>(null)
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage] = useState(10);

  
        
            useEffect(() => {
              
             const interval = setInterval(() => {
                setDate(new Date());
              }, 1000);

              const interval2 = setInterval(() => {
                setMonthDays(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
              }, 1000*60*60*24);
        
              clearInterval(interval);
              clearInterval(interval2);
              
            }, []);
      
              const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
              
                    event.preventDefault();
                    startTransition(  async () => { 
                        if (!valeur_kw) {
                          setMessage("L'index ne peut pas être vide");
                          setIsOpenAction(false);
                          setIsOpen(true)
                          return;
                        }
  
                        
  
                        if(Number(valeur_kw) < 0){
                          setMessage("L'index ne peut pas être négatif");
                          setIsOpenAction(false);
                          setIsOpen(true)
                          return;
                        }
                        if(Number(valeur_kw) > 1000){
                          setMessage("L'index ne peut pas être supérieur à 1000");
                          setIsOpenAction(false);
                          setIsOpen(true)
                          return;
                        }
  
                        const index = await updateIndex(item!.id, item!.client_id, parseFloat(valeur_kw), item?.compteur_id);
                        
                        if(index){
  
                          getUser()
                            .then( async (data) => {
                          
                              if(data?.client.index){
                                setAllIndex(data?.client.index) 
                                setAllIndexFiltered(data?.client.index)  
                              }
                          
                            })
                            .catch((error) => {
                              console.error('Error fetching user data:', error);
                            })
  
                          setMessage("L'index a bien été mis à jour");
                          setIsOpenAction(false);
                          setSuccess(true);
                          setIsOpen(true)
                          setValeur_kw("");
  
                          return;
                        }
  
                    })
                    
                    };
  
                    const onEdit = (id: number, item: Index) => {
                      setValeur_kw(item?.valeur_kw);
                      setIsOpenAction(true);
                      setItem(item);
                      setIndexDate(item.created_at.toISOString().split("T")[0]);
                    }
  
                    const onDelete = (item: Index) => {
                      const accept= confirm("Voulez-vous supprimer cet index ?")
  
                      if(accept){
                        deleteIndex(item.id).then(async res => {
                          if(res){
  
                            getUser()
                            .then( async (data) => {
                              if(data) setAuthUser(data);
                          
                              if(data?.client.index){
                                setAllIndex(data?.client.index) 
                                setAllIndexFiltered(data?.client.index)  
                              }
                          
                            })
                            .catch((error) => {
                              console.error('Error fetching user data:', error);
                            })
  
                            setMessage("L'index a bien été supprimé");
                            setIsOpenAction(false);
                            setSuccess(true);
                            setIsOpen(true)
                            setValeur_kw("");
                           
                          }
                        })
                      } 
                    }
                   
        
      
        
        
      
        if (!user) return <Loading />;
    

    return (
      <Dashboard>

<div className="flex flex-col w-full">
 {isOpen && <Modal success={success} setSuccess={setSuccess} setMessage={setMessage}  setIsOpen={setIsOpen} message={message} />}
  
{isOpenAction && <EditDeleteModal  setIsOpen={setIsOpenAction} title="Editer un index" >
      
      <div className="mt-4">
                          <form onSubmit={(onSubmit)} className="flex flex-col gap-5">
                          <div className="flex flex-col w-full">
                              <label htmlFor="valeur">Index</label>
                              <input
                                  type="text"
                                  name="valeur_kw"
                                  required
                                  value={valeur_kw}
                                  onChange={(e) => setValeur_kw(e.target.value)}
                                  placeholder="Entrer l'index"
                                  className="p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                              />
                              </div>
                            <div className="flex justify-between gap-4">
              
                              <div className="flex flex-col">
                                <label htmlFor="valeur">Heure</label>
                                <div className="flex gap-1  w-[90px]">
                                  <input
                                    type="text"
                                    name=""
                                    disabled={true}
                                    value={hours}
                                    id=""
                                    placeholder="10"
                                    className="w-1/2 p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                                  />
                                  :
                                  <input
                                    type="text"
                                    disabled={true}
                                    value={minutes}
                                    name=""
                                    id=""
                                    placeholder="30"
                                    className="w-1/2 p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col w-[150px]">
                                <label htmlFor="valeur">Date</label>
                               <InputDate indexDate={indexDate} setIndexDate={setIndexDate} />
                              </div>
                            </div>
                              <ButtonBlue  icon="recorded" name={isPending ? "Modifier l'index en cours" : "Modifier l'index"} />
                          </form>
                        </div>
  </EditDeleteModal>}
 
            <CreateIndex setAllIndex={setAllIndex} setAllIndexFiltered={setAllIndexFiltered} setUser={setUser} user={user} />
      
      <Table 
        authUser={authUser} 
        onDelete={onDelete} 
        onEdit={onEdit} 
        setAllIndex={setAllIndex} 
        setAllIndexFiltered={setAllIndexFiltered}  
        data={allIndexFiltered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} 
        property={["id", "valeur_kw", "Date", "Heure"]} 
      >
         
        <div className="flex gap-3 items-center ">
          <h1>Liste Index </h1>
          <Image src="/icons/index.svg" alt="index-icon" width={25} height={25} />
        </div>
        <Filter selectFilter={selectFilter}  setAllIndexFiltered={setAllIndexFiltered}  allIndex={allIndex}>
                <Image src="/icons/filter.svg" alt="filter-icon" width={25} height={25} className="cursor-pointer" />
                <Select 
                  setValue={setSelectFilter} 
                  value={selectFilter}  
                  name="date" 
                  options={[
                    { name: "Cette semaine", value: "week" },
                    { name: "Ce mois", value: "month" },
                    { name: "Cette année", value: "year" }
                  ]} 
                />
            </Filter>
      </Table>

      {/* Ajoutez la pagination ici */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-midnightblue text-white rounded disabled:opacity-50"
        >
          Précédent
        </button>
        
        <span className="px-4 py-2 text-midnightblue">
          Page {currentPage}
        </span>
        
        <button
          onClick={() => setCurrentPage(p => 
            Math.min(p + 1, Math.ceil(allIndexFiltered.length / itemsPerPage))
          )}
          disabled={currentPage * itemsPerPage >= allIndexFiltered.length}
          className="px-4 py-2 bg-midnightblue text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  </Dashboard>
)
}