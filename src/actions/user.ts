import { prisma } from "@/utils/prisma";

// Create
export const createUser = async (nom: string, prenoms: string, date_naissance: Date, email: string, mot_de_passe: string, client_id: number, role_id: number) => {
    return await prisma.user.create({
      data: {
        nom,
        prenoms,
        date_naissance,
        email,
        mot_de_passe,
        client_id,
        role_id,
      },
    });
  };
  
  // Read
  export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        client: true,
        role: true,
      },
    });
  };
  
  export const getAllUsers = async () => {
    return await prisma.user.findMany({
      include: {
        client: true,
        role: true,
      },
    });
  };
  
  // Update
  export const updateUser = async (id: number, nom: string, prenoms: string, date_naissance: Date, email: string, mot_de_passe: string, client_id: number, role_id: number) => {
    return await prisma.user.update({
      where: { id },
      data: {
        nom,
        prenoms,
        date_naissance,
        email,
        mot_de_passe,
        client_id,
        role_id,
      },
    });
  };
  
  // Delete
  export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
      where: { id },
    });
  };
  