import { calculerFacture, createIndex, getAllIndexes, getIndexToday, getLastIndex } from "@/actions";
import { userProps } from "@/types";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import ButtonBlue from "@/components/buttonBlue";
import Modal from "@/components/Modal";
import { recorderIndexConso } from "@/actions/index";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import InputDate from "@/components/forms/InputDate";



interface IndexTodayProps {
    user: userProps | null;
    compteurId: string;
    setCompteurId: React.Dispatch<React.SetStateAction<string>>;
    setFacture: React.Dispatch<React.SetStateAction<number>>;
    setLastIndex: React.Dispatch<React.SetStateAction<number>>;
}

export   const  IndexToday :  React.FC<IndexTodayProps> =({ setCompteurId, compteurId, user, setFacture, setLastIndex}) =>{


    const [isOpen, setIsOpen] = useState(false);
    const [valeur_kw, setValeur_kw] = useState<string>("")
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<string>("");
    const router = useRouter()


    const [indexDate, setIndexDate] = useState<Date>(new Date())

 



    const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {

      event.preventDefault();
      startTransition(  async () => { 
        if (!valeur_kw || !user?.id || !compteurId) {
          console.error("Missing required fields");
          setMessage("Missing required fields");
          setIsOpen(true);
          return;
        }
       
        const oldIndex = await getLastIndex(user.id, Number(compteurId));
        const allIndexes = await getAllIndexes();

        if (!oldIndex) {
          return;
        }
        
        const consommation_kw = parseFloat(valeur_kw) - oldIndex?.valeur_kw;
        const consommation_fcfa = parseFloat(valeur_kw) * 104.33;
       
    
        try {
          if(await getIndexToday(user.id, Number(compteurId))){
            setMessage("Index deja enregistrer");
            console.log("Index deja enregistrer");
            setIsOpen(true);
            return;
          }
          if(allIndexes.length > 0){
           const index =  await recorderIndexConso(user.id, parseInt(compteurId.toString()), parseFloat(valeur_kw), consommation_kw, consommation_fcfa, oldIndex.id, user.client_id);

            setMessage("index enregistré avec succès !");
            setValeur_kw("");
            setIsOpen(true);
            await calculerFacture(user.id, parseInt(compteurId)).then((facture) => {
              console.log("facture ",facture);
              setLastIndex(index.newIndex?.valeur_kw);
              setFacture(facture?.totalFacture)
              }).catch((error) => {
                console.error('Error fetching user data:', error);
              });
          }else{
          const index = await createIndex( parseFloat(valeur_kw), parseInt(user.id.toString()), parseInt(compteurId.toString()));

          setMessage("index enregistré avec succès !");
          setValeur_kw("");
          setIsOpen(true);
          await calculerFacture(user.id, parseInt(compteurId)).then((facture) => {
            console.log("facture ",facture);
            setLastIndex(index.valeur_kw);
            setFacture(facture?.totalFacture)
            }).catch((error) => {
              console.error('Error fetching user data:', error);
            });
          }
          

        } catch (error) {
          console.error(error);
          setMessage(error);
          setIsOpen(true);
          
        }

      })

              
      };

    

  return (
    <div className="w-72 h-48 py-2 px-3 bg-white text-midnightblue border rounded-lg relative">
        {isOpen && <Modal  setIsOpen={setIsOpen} message={message} />}
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
                          <div className="flex flex-col w-[110px]">
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
                            <label htmlFor="valeur">Heure</label>
                            <div className="flex gap-1  w-[140px]">
                                <InputDate />

                            </div>
                          </div>
                        </div>
                        <ButtonBlue  icon="recorded" name={isPending ? "Enregistrement en cours" : "Enregistrer"} />
                      </form>
                    </div>
                  </div>
  );
}   