import ButtonBlue from "@/components/ButtonBlue"; 
import InputDate from "@/components/forms/InputDate";
import { useEffect, useMemo, useState, useTransition } from "react";
import Modal from "../Modal"
import {  createIndex, getIndexToday, getLastIndex, recorderIndexConso } from "@/actions";
import { Index, userProps } from "@/types";
import { getUser } from "@/app/(auth)/login/action";
import { clear } from "console";

interface addIndexProps {
  user: userProps | null;
  setUser: React.Dispatch<React.SetStateAction<userProps|null>>;
  setAllIndex: React.Dispatch<React.SetStateAction<Index[]>>;
  setAllIndexFiltered: React.Dispatch<React.SetStateAction<Index[]>>;
}


export default function AddIndex({user, setUser, setAllIndex, setAllIndexFiltered}: addIndexProps){

  const [isOpen, setIsOpen] = useState(false);
    const [valeur_kw, setValeur_kw] = useState<string>("")
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<string>("");
    const [compteurId, setCompteurId] = useState<string>(user?.client?.compteur[0]?.id.toString())
    const [indexDate, setIndexDate] = useState<string>(new Date().toISOString().split("T")[0]); // Format 10/10/2022
    const [date, setDate] = useState<Date>(new Date());
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
      
     const interval = setInterval(() => {
        setDate(new Date());
      }, 1000);

      clearInterval(interval);
      
    }, []);

    const formattedDate = useMemo(() => {
          if (indexDate !== "") {
            const [year, month, day] = indexDate.split("-").map(Number); 
            return new Date(year, month - 1, day);
          }
          return null;
        }, [indexDate]);
        


      const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      
            event.preventDefault();
            startTransition(  async () => { 
              if (!valeur_kw || !user?.id || !compteurId) {
                console.error("Missing required fields");
                setMessage("Missing required fields");
                return;
              }      

              const oldIndex = await getLastIndex(user.client_id, Number(compteurId));
              
              
              const allIndexes = user?.client.index;
      
              if (!oldIndex) {
                setMessage("une erreur est survenue, veuillez réessayer");
                return;
              }
      
              if(oldIndex?.valeur_kw > parseFloat(valeur_kw)){
                setMessage("L'index precedent ne peut pas être supérieur à celui de la jour");
                return;
              }
              
              const consommation_kw = parseFloat(valeur_kw) - oldIndex?.valeur_kw;
              const consommation_fcfa = parseFloat(valeur_kw) * 104.33;
             
          
              try {
                if(await getIndexToday(user.client_id, Number(compteurId))){
                  setMessage("Index deja enregistrer");
                  setIsOpen(true);
                  return;
                }
                if(allIndexes.length > 0){
                 await recorderIndexConso(parseInt(compteurId.toString()), parseFloat(valeur_kw), consommation_kw, consommation_fcfa, oldIndex.id, user.client_id, formattedDate);
      
                  setMessage("index enregistré avec succès !");
                  getUser()
                    .then( async (data) => {
                    setUser(data);
                  
                  });
                  setValeur_kw("");
                  setIsOpen(true);
                  
                }else{
                await createIndex( parseFloat(valeur_kw), parseInt(user.client_id.toString()), parseInt(compteurId.toString()), formattedDate!);
                getUser()
                .then( async (data) => {
                  if(data) setUser(data);

                  if(data?.client.index){
                    setAllIndex(data?.client.index) 
                    setAllIndexFiltered(data?.client.index)  
                  }

                })
                setMessage("index enregistré avec succès !");
                setSuccess(true);
                setValeur_kw("");
                setIsOpen(true);
                
                }
                
      
              } catch (error) {
                console.error(error);
                setMessage("Une erreur est survenue, veuillez réessayer");
                setIsOpen(true);
              }
      
            })
      
                    
            };
      

    return(
  <div className="flex justify-center items-center px-20">
        {isOpen && <Modal success={success} setSuccess={setSuccess} setMessage={setMessage}  setIsOpen={setIsOpen} message={message} />}

      <div className="flex flex-col gap-1 text-xs absolute top-2 right-2">
        <label htmlFor="compteur" className="font-medium text-gray-700">
          Choisir un compteur
        </label>
        <select
          name="compteur_id"
          id="compteur"
          onChange={(e) => setCompteurId(e.target.value)}
          className="px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {user?.client?.compteur.map((compteur) => (
            <option key={compteur.id} value={compteur.id}>
              {compteur.type_compteur}
            </option>
          ))}
        </select>
      </div>

      <div className="my-3 bg-index h-64 w-full flex justify-center items-center ">

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
                        <ButtonBlue  icon="recorded" name={isPending ? "Enregistrement en cours" : "Enregistrer"} />
                    </form>
                  </div>
                </div>
        </div>

    )
}