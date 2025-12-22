"use client";
import Dashboard from "@/components/DashboardComponent";
import Table from "@/components/tables/Table";
import Image from "next/image";
import ButtonBlue from "@/components/buttonBlue";
import { getUser } from "@/app/(auth)/login/action";
import {  userProps } from "@/types";
import { useEffect, useState, useTransition } from "react";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Form from "@/components/forms/Form";
import EditDeleteModal from "@/components/EditDeleteModal";
import { deleteUserAccount, updateUserAccount } from "@/actions/user";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import { useAuth } from "../../../../../../Store/auth";

export default function Users() {

  const {user} = useAuth();
  const [roles, setRoles] = useState<string[]>([]);
  const [isOpenAction, setIsOpenAction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [client_id, setClient_id] = useState<number>(0);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [item, setItem] = useState<userProps | null>(null);
  const [users, setUsers] = useState<userProps[]>([]);
  const [success, setSuccess] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);

  useEffect(() => {
   

    const fetchData = async () => {
        const rolesResponse = await fetch("/api/role").then((res) => res.json());

        if (user) {
          setUsers(user?.client?.user.filter(userf => userf.id !== user.id));
          setClient_id(user.client_id);
        }

        const rolesData = await rolesResponse;
        if (user) {
          setRoles(rolesData.data);
        }
      }
      

    fetchData();

  }, [user?.client_id]);



  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      if (!fullName || !email || !role) {
        setMessage("Tous les champs sont obligatoires");
        setIsOpenAction(false)
        setIsOpen(true);
        return;
      }

      if (Number(role) < 0) {
        setMessage("L'index ne peut pas être négatif");
        setIsOpenAction(false)
        setIsOpen(true);
        return;
      }

      try {
        const user = await updateUserAccount(
          item!.id,
          fullName,
          email,
          password,
          item!.client_id,
          Number(role),
          item!.userId
        );

        if (user) {
          await getUser().then(async (data) => {
            if (data) setUsers(data?.client?.user);
          });

          setMessage("L'utilisateur a été modifié");
          setIsOpenAction(false)
          setSuccess(true)
          setIsOpen(true);
          return;
        }
      } catch (error) {
        console.error(error);
        setMessage("L'utilisateur n'a pas été modifié");
        setIsOpenAction(false)

        setIsOpen(true);
      }
    });
  };

  const onEdit = (id: number, item: userProps) => {
    setRole(item?.role.id);
    setFullName(item?.nom_complet);
    setEmail(item?.email);
    setItem(item);
    setIsOpenAction(true);
  };

  const onDelete = async (item: userProps) => {
    const accept = confirm("Voulez-vous supprimer cet utilisateur ?");

    if (accept) {
      try {
        const res = await deleteUserAccount(item.userId, item.id);
        if (!res.user) {
          setMessage("L'utilisateur n'existe pas");
          setIsOpenAction(false)
          setIsOpen(true);
          return;
        }

        await getUser().then(async (data) => {
          if (data) setUsers(data?.client?.user);
        });

        setMessage("L'utilisateur a été supprimé");
        setIsOpenAction(false)
        setSuccess(true)
        setIsOpen(true);
      } catch (error) {
        setMessage("Erreur lors de la suppression de l'utilisateur");
        setIsOpenAction(false)
        setIsOpen(true)
        console.error(error);
      }
    }
  };

  if (!user) return <Loading />;

  return (
    <Dashboard>
        {isOpen && <Modal success={success} setSuccess={setSuccess} setMessage={setMessage}  setIsOpen={setIsOpen} message={message} />}
      {isOpenAction && (
        <EditDeleteModal setIsOpen={setIsOpenAction} title="Editer un index">
          <div className="flex justify-center items-center h-full">
            <Form width="w-[350px]" onSubmit={onSubmit}>
              <Input
                name="fullName"
                setValue={setFullName}
                label="Votre nom complet"
                value={fullName}
                placeholder="Nom complet"
              />
              <Input
                name="email"
                setValue={setEmail}
                label="E-mail"
                value={email}
                placeholder="email"
              />
              <Select
                width="w-full p-2 py-[0.6rem] rounded"
                value={role}
                setValue={setRole}
                name="role"
                label="Rôle"
                options={roles}
              />
              <Input
                type="password"
                name="password"
                setValue={setPassword}
                value={password}
                label="password"
                placeholder="password"
              />
              <ButtonBlue width="w-full" name={isPending ? "Modification en cours" : "Modifier"} icon="recorded" />
            </Form>
          </div>
        </EditDeleteModal>
      )}
      <div className="w-full overflow-x-auto">
      <Table 
        authUser={user} 
        onDelete={onDelete} 
        onEdit={onEdit} 
        data={users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} 
        property={["id", "nom_complet", "email", "role"]}
      >
        <div className="flex  gap-3 justify-between md:items-center w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Liste des Utilisateurs</h1>
            <Image src="/icons/users.svg" alt="index-icon" width={25} height={25} />
          </div>
          <ButtonBlue 
            url="/admin/dashboard/users/add" 
            name="Ajouter" 
            icon="add-user" 
            width="md:ml-4  text-sm md:text-base md:w-64 w-14"
          />
        </div>
      </Table>
    </div>

    {/* Pagination responsive */}
    <div className="flex flex-col md:flex-row justify-between items-center  gap-2">
      <span className="text-sm text-gray-600">
        {users.length} utilisateurs - Page {currentPage}
      </span>
      
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm bg-midnightblue text-white rounded disabled:opacity-50"
        >
          Précédent
        </button>
        
        <button
          onClick={() => setCurrentPage(p => 
            Math.min(p + 1, Math.ceil(users.length / itemsPerPage))
          )}
          disabled={currentPage * itemsPerPage >= users.length}
          className="px-3 py-1.5 text-sm bg-midnightblue text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  </Dashboard>
  );
}
