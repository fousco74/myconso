"use client";

import Dashboard from "@/components/DashboardComponent";
import Image from "next/image";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import ButtonBlue from "@/components/buttonBlue";
import { startTransition, useEffect, useState, useTransition } from "react";
import { userProps } from "@/types";
import { getUser } from "@/app/(auth)/login/action";
import Modal from "@/components/Modal";
import { updateUserAccount, uploadProfileImage } from "@/actions/user";
import Loading from "@/components/Loading";

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");
    const [user, setUser] = useState<userProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState<string>("");
    const [role, setRole] = useState<number | undefined>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [roles, setRoles] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const [img, setImg] = useState<string>("");
    const [file, setFile] = useState<File | undefined>(undefined); // Ensure file is initialized as undefined

    useEffect(() => {
        getUser()
            .then(async (data) => {
                if (data) {
                    setUser(data);

                    setImg(data.profile);

                    const fetchRoles = async () => {
                        const rolesResponse = await fetch("/api/role");
                        const data = await rolesResponse.json();
                        setRoles(data.data);
                    };
                    fetchRoles();
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(async () => {
            if (!fullName && !email && !role && !file) {
                setMessageError("Tous les champs sont obligatoires");
                return;
            }

            if (Number(role) < 0) {
                setMessageError("L'index ne peut pas être négatif");
                return;
            }

            // Ensure 'file' is available before trying to upload
            if (file) {
                try {
                    const uploadedFile = await uploadProfileImage(file, user!.id);
                    if (uploadedFile) {
                        setImg(uploadedFile);
                        setMessage("L'image de profil a bien été téléversée");
                        setSuccess(true);
                        setIsOpen(true);
                        return;
                    }
                } catch (error) {
                    console.error(error);
                    setMessageError("Erreur lors de l'upload de l'image de profil");
                }
            }

            try {
                const userUpdate = await updateUserAccount(
                    user!.id,
                    fullName,
                    email,
                    password,
                    user?.client_id,
                    Number(role),
                    user?.userId
                );

                if (userUpdate) {
                    setMessage("L'utilisateur a été modifié");
                    setSuccess(true);

                    setIsOpen(true);
                }
            } catch (error) {
                console.error(error);
                setMessageError("L'utilisateur n'a pas été modifié");

                setIsOpen(true);
            }
        });
    };

    const uploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImg(imageUrl);
            setFile(selectedFile); // Set the file here
        }
    };

    if (loading) return <Loading/>;

    return (
        <Dashboard>
          <div className="w-full h-full bg-white flex flex-col p-3 md:p-4 gap-4 md:gap-6 rounded-lg relative">
            {isOpen && <Modal success={success} setSuccess={setSuccess} setMessage={setMessage} setIsOpen={setIsOpen} message={message} />}
            
            <input type="file" onChange={uploadProfile} id="profile-pic" className="hidden" />
    
            {/* Section Photo de profil */}
            <div className="flex flex-col items-center md:absolute md:top-6 md:left-6 lg:top-10 lg:left-40 z-10">
              <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px]">
                <Image
                  src={img ? `${img}` : "/profile/profile.jpg"}
                  alt="Photo de profil"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              
              <label htmlFor="profile-pic" className="flex gap-1 cursor-pointer mt-2 hover:opacity-80">
                <span className="text-xs md:text-sm text-midnightblue">Modifier la photo</span>
                <Image src="/icons/edit.svg" alt="Modifier" width={12} height={12} className="mt-[2px]" />
              </label>
            </div>
    
            {/* Titre */}
            <div className="flex gap-2 md:gap-3 items-center justify-center md:justify-start mt-4 md:mt-0">
              <h1 className="text-xl md:text-2xl font-semibold">Mon profil</h1>
              <Image src="/icons/profile.svg" alt="index-icon" width={20} height={20} className="md:w-6 md:h-6" />
            </div>
    
            {/* Formulaire */}
            <div className="flex flex-col justify-center items-center h-full mt-4 md:mt-0">
              {messageError && <p className="text-center text-sm md:text-base text-red-500 mb-4">{messageError}</p>}
              
              <Form width="w-full md:w-[350px]" onSubmit={onSubmit}>
                <Input
                  name="fullName"
                  value={user?.nom_complet}
                  setValue={setFullName}
                  label="Nom complet"
                  placeholder={fullName}
                  className="text-sm md:text-base"
                />
                
                <Input
                  name="email"
                  value={user?.email}
                  setValue={setEmail}
                  label="E-mail"
                  placeholder={email}
                  className="text-sm md:text-base"
                />
                
                <Select
                  width="w-full p-2 py-[0.5rem] md:py-[0.6rem] rounded"
                  value={user?.role_id}
                  setValue={setRole}
                  name="role"
                  label="Rôle"
                  options={roles}
                  className="text-sm md:text-base"
                />
                
                <Input
                  type="password"
                  value={password}
                  setValue={setPassword}
                  name="password"
                  label="Mot de passe"
                  placeholder="Mot de passe"
                  className="text-sm md:text-base"
                />
                
                <ButtonBlue
                  width="w-full"
                  name={isPending ? "Modification en cours..." : "Modifier"}
                  icon="recorded"
                  className="text-sm md:text-base py-2"
                />
              </Form>
            </div>
          </div>
        </Dashboard>
      );
}
