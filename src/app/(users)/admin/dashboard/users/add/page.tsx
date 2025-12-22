


"use client"
import Dashboard from "@/components/DashboardComponent";
import Image from "next/image";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input"
import Select from "@/components/forms/Select";
import ButtonBlue from "@/components/ButtonBlue"
import { startTransition, useEffect, useState, useTransition } from "react";
import { getUser } from "@/app/(auth)/login/action";
import { createUser, createUserAccount, getUserByEmail } from "@/actions/user";
import Modal from "@/components/Modal";
import { get } from "http";
import Loading from "@/components/Loading";




export default function UserAdd(){

    const [roles, setRoles] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition()
    const [client_id, setClient_id] = useState<number>(0);
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [role, setRole] = useState<number>(0);
    const [password, setPassword] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    
    useEffect(() => { 

        getUser()
            .then( async (data) => {
              if(data) setClient_id(data?.client_id);

              const fechRoles = async () => {
                const roles = await fetch("/api/role")
                const data = await roles.json()
                setRoles(data.data)
            }
            fechRoles()

            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
            })
            .finally(() => {
              setLoading(false);
            });
        
        
        
    }, []); 

const onsubmit = async (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    
    startTransition(  async () => { 
        if(fullName === "" || email === "" || role === 0 || password === "" || client_id === 0){
            setMessage("Veuillez remplir tous les champs");
            setIsOpen(true);
            return;
        }
    
        const user = await getUserByEmail(email);
    
        if(user){
            setMessage("L'utilisateur existe déjà");
            setIsOpen(true);
            return;
        }
    
        createUserAccount(fullName, email, password, client_id, Number(role))
            .then((data) => {
                if(data){
                    setMessage("Utilisateur créé avec succès");
                    setSuccess(true)
                    setIsOpen(true);
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setRole(0);
                }
            })
            .catch((error) => {
                console.error('Error creating user:', error);
                setMessage("Une erreur est survenue lors de la création de l'utilisateur");
                setIsOpen(true);
            });
        })
    
};

if (loading) return <Loading />;

    return (
        <Dashboard>
            <div className="w-full h-full bg-white flex flex-col p-4 gap-6 rounded-lg">
        {isOpen && <Modal success={success} setSuccess={setSuccess} setMessage={setMessage}  setIsOpen={setIsOpen} message={message} />}
                <div className="flex  gap-3 items-center">
                    <h1>Utilisateur </h1>
                    <Image src="/icons/users.svg" alt="index-icon" width={25} height={25} />
                </div>
                <div className="flex justify-center items-center h-full">
                    <Form width="w-[350px]" onSubmit={onsubmit}>
                        <Input name="fullName" setValue={setFullName} label="Votre nom complet" value={fullName} placeholder="Nom complet" />
                        <Input name="email" setValue={setEmail} label="E-mail" value={email} placeholder="email"/>
                        <Select width="w-full p-2 py-[0.6rem] rounded" value={role} setValue={setRole} name="role" label="Rôle"  options={roles} />
                        <Input type="password" name="password" setValue={setPassword} value={password} label="password" placeholder="password" />
                        <ButtonBlue width="w-full" name={isPending ? "Enregistrement en cours" : "Enregistrer"} icon="recorded" />
                    </Form>
                </div>
            </div>
        </Dashboard>
    )
}