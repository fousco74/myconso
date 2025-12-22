import { calculerFacture, createIndex, getAllIndexes, getIndexToday, getLastIndex } from "@/actions";
import { userProps } from "@/types";
import Image from "next/image";
import { useEffect, useMemo, useState, useTransition } from "react";
import ButtonBlue from "@/components/buttonBlue";
import Modal from "@/components/Modal";
import { recorderIndexConso } from "@/actions/index";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import InputDate from "@/components/forms/InputDate";
import { getUser } from "@/app/(auth)/login/action";
import { useAuth } from "../../../Store/auth";



interface IndexTodayProps {
    compteurId: string;
    setCompteurId: React.Dispatch<React.SetStateAction<string>>;
    setFacture: React.Dispatch<React.SetStateAction<number>>;
    setLastIndex: React.Dispatch<React.SetStateAction<number>>;
}

export   const  IndexToday :  React.FC<IndexTodayProps> =({ setCompteurId, compteurId, setFacture, setLastIndex}) =>{

    const {user, setUser} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [valeur_kw, setValeur_kw] = useState<string>("")
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<string>("");

    
    const todayStr = new Date().toISOString().split("T")[0]; 
    const [indexDate, setIndexDate] = useState<string>(todayStr);

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
        if (!valeur_kw || !user?.client_id || !compteurId) {
          console.error("Missing required fields");
          setMessage("Missing required fields");
          setIsOpen(true);
          return;
        }
       
        const oldIndex = await getLastIndex(user.client_id, Number(compteurId));

        
        const allIndexes = user.client.index;

        if (!oldIndex) {
          setMessage("une erreur est survenue, veuillez réessayer");
          setIsOpen(true);
          return;
        }

        if(oldIndex?.valeur_kw > parseFloat(valeur_kw)){
          setMessage("L'index precedent ne peut pas être supérieur à celui de la jour");
          setIsOpen(true);
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
           const index =  await recorderIndexConso(parseInt(compteurId.toString()), parseFloat(valeur_kw), consommation_kw, consommation_fcfa, oldIndex.id, user.client_id, formattedDate);

            setMessage("index enregistré avec succès !");
            setSuccess(true);
            getUser()
              .then( async (data) => {
              setUser(data);
            });
            setValeur_kw("");
            setIsOpen(true);
            await calculerFacture(user.client_id, parseInt(compteurId)).then((facture) => {
              console.log("facture ",facture);
              setLastIndex(index.newIndex?.valeur_kw);
              setFacture(facture?.totalFacture)
              }).catch((error) => {
                console.error('Error fetching user data:', error);
                setMessage("Une erreur est survenue, veuillez réessayer");
                setIsOpen(true);
              });
          }else{
          const index = await createIndex( parseFloat(valeur_kw), parseInt(user.client_id.toString()), parseInt(compteurId.toString()), formattedDate);

          setMessage("index enregistré avec succès !");
          setSuccess(true);
          getUser()
              .then( async (data) => {
              setUser(data);
            });
          setValeur_kw("");
          setIsOpen(true);
          await calculerFacture(user.client_id, parseInt(compteurId)).then((facture) => {
            console.log("facture ",facture);
            setLastIndex(index.valeur_kw);
            setFacture(facture?.totalFacture)
            }).catch((error) => {
              console.error('Error fetching user data:', error);
              setMessage("Une erreur est survenue, veuillez réessayer");
              setIsOpen(true);
            });
          }
          

        } catch (error) {
          console.error(error);
          setMessage("Une erreur est survenue, veuillez réessayer");
          setIsOpen(true);
          
        }

      })

              
      };

    

  return (
    <div className="md:w-72 h-48 py-2 px-3 bg-white text-midnightblue border rounded-lg relative">
        {isOpen && <Modal success={success} setSuccess={setSuccess} setMessage={setMessage}  setIsOpen={setIsOpen} message={message} />}
                    <div className="flex gap-2">
                      <h3>L&apos;Index du jour</h3>
                      <Image
                        src="/icons/index.svg"
                        alt="index"
                        width={20}
                        height={20}
                      />
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
    
                    </div>
    
                    <div className="w-full mt-4">
                      <form onSubmit={(onSubmit)} className="flex flex-col gap-5">
                        <div className="flex justify-between gap-1 pt-2">
                          <div className="flex flex-col w-1/2 md:w-[110px]">
                            <label htmlFor="valeur">Index</label>
                            <input
                              type="text"
                              name="valeur_kw"
                              id="valeur"
                              required
                              value={valeur_kw}
                              onChange={(e) => setValeur_kw(e.target.value)}
                              placeholder="Entrer l'index"
                              className="p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                            />
                            
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="valeur">Date</label>
                            <div className="flex gap-1  md:w-[140px]">
                                <InputDate indexDate={indexDate} setIndexDate={setIndexDate} />

                            </div>
                          </div>
                        </div>
                        <ButtonBlue    icon="recorded" name={isPending ? "Enregistrement en cours" : "Enregistrer"} width="w-full md:w-auto" />
                      </form>
                    </div>
                  </div>
  );
}   


