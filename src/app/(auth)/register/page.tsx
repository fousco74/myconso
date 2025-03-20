"use client"

import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import Select from "@/components/forms/Select";
import Input from "@/components/forms/Input";
import { createClientAccount } from "@/actions/client";
import Modal from "@/components/Modal"
import Link from "next/link";

export default function Inscription() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [compteur, setCompteur] = useState("Compteur A");
    const [abonnement, setAbonnement] = useState("Compteur B");
    const [index, setIndex] = useState("");
    const [periode, setPeriode] = useState("");
    const [indexDate, setIndexDate] = useState("");
    const [typeClient, setTypeClient] = useState("Particulier"); 
    const [nomOrg, setNomOrg] = useState("");
    const [numero, setNumero] = useState("");
    
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [success, setSuccess] = useState(false);
    
    const formattedDate = useMemo(() => {
        if (indexDate !== "") {
            const [year, month, day] = indexDate.split("-").map(Number); 
            return new Date(year, month - 1, day);
        }
        return null;
    }, [indexDate]);

    const validateStep1 = () => {
        if (!nomOrg || !typeClient || !compteur || !abonnement || !numero) {
            setMessage("Veuillez remplir tous les champs !");
            setIsOpen(true);
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!index || !indexDate || !fullName || !email || !password) {
            setMessage("Veuillez remplir tous les champs !");
            setIsOpen(true);
            return false;
        }
        return true;
    };

    const nextStep = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    const prevStep = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep2()) {
            startTransition(async () => {
                try {
                    const response = await createClientAccount(compteur, abonnement, nomOrg, typeClient, index, formattedDate!, email, password, fullName, numero, periode);

                     if(response){
                        setSuccess(true);
                        setAbonnement("");
                        setTypeClient("");
                        setNomOrg("");
                        setIndex("");
                        setPeriode("");
                        setNumero("");
                        setFullName("");
                        setEmail("");
                        setPassword("");
                        setMessage("Inscription réussie !");
                    }else{
                        setMessage("Erreur lors de la création du compte");
                        setSuccess(false);
                    }
                } catch (error) {
                    setMessage(`${error}`);
                }
            });
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col lg:flex-row-reverse p-0 m-0">
            <div className="lg:w-1/2 flex items-end lg:px-16 flex-col relative justify-center lg:p-10 p-4">
                <Image src='logo/logo.svg' alt='logo' className='mb-3' width={280} height={280} />
                <span className='text-deepBlue max-lg:text-[14px] text-end'>L'énergie en toute transparence à portée de clic.</span>
                <Image src='icons/union-reverse.svg' alt='logo' className='mb-3 max-lg:hidden absolute bottom-14 left-[-5px] pr-16' width={700} height={700} />
            </div>

            <div className="lg:w-1/2 flex items-center text-center flex-col text-white p-10 bg-connexion">
                <div className="lg:mt-24 w-full max-w-[400px]">
                    <h2 className="font-bold text-xl">Inscription - Étape {step}/2</h2>

                    {step === 1 && (
                        <div className="flex flex-col gap-4 mb-5">
                            <p className="text-center opacity-85 text-sm">Bienvenue ! Créez votre compte.</p>
                            <div className="flex flex-col gap-4">
                                <Select value={compteur} setValue={setCompteur} width="w-full p-2 rounded" name="compteur" options={[{ name: "Compteur A" }, { name: "Compteur B" }]} />
                                <Select value={abonnement} setValue={setAbonnement} width="w-full p-2 rounded" name="abonnement" options={[{ name: "AAAA" }, { name: "BBBB" }]} />
                                <Input name="nom_org" setValue={setNomOrg} value={nomOrg} placeholder="Nom d'organisation" />
                                <Input name="numero" setValue={setNumero} value={numero} placeholder="Numéro de compteur" />
                                <button onClick={nextStep} disabled={isPending} className={`px-4 py-2 rounded bg-white text-deepBlue transition ${isPending ? 'opacity-50' : ''}`}>Suivant</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col gap-4 mb-5">
                           <p className="text-center bg-red-400">{message}</p>
                            <p className="text-center opacity-85 text-sm">Une dernière étape avant de commencer !</p>
                            <Input name="index" setValue={setIndex} value={index} placeholder="Dernier index" />
                            <Input name="date" type="date" setValue={setIndexDate} value={indexDate} placeholder="Date du dernier index" />
                            <Input name="fullName" setValue={setFullName} value={fullName} placeholder="Votre nom complet" />
                            <Input name="email" setValue={setEmail} value={email} placeholder="Email" />
                            <Input name="password" setValue={setPassword} value={password} placeholder="Mot de passe" />
                            <div className="flex gap-4">
                                <button onClick={prevStep} disabled={success} className="px-4 py-2 rounded bg-white text-deepBlue">Précédent</button>
                                <button onClick={handleSubmit} disabled={isPending || success} className={`px-4 py-2 rounded bg-white text-deepBlue transition ${isPending ? 'opacity-50' : ''}`}>{isPending ? 'Inscription en cours...' : 'Soumettre'}</button>
                            </div>
                        </div>
                    )}
                    <Link href="/login" className="mt-10 text-white text-opacity-85">Déjà un compte ? Se connecter</Link>
                </div>
            </div>
        </div>
    );
}