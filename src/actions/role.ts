import { prisma } from "@/utils/prisma";

// Create
export const createRole = async (nom: string) => {
    return await prisma.role.create({
      data: { nom },
    });
  };
  
  // Read
  export const getRoleById = async (id: number) => {
    return await prisma.role.findUnique({
      where: { id },
      include: {
        role_permission: true,
        user: true,
      },
    });
  };
  
  export const getAllRoles = async () => {
    return await prisma.role.findMany({
      include: {
        role_permission: true,
        user: true,
      },
    });
  };
  
  // Update
  export const updateRole = async (id: number, nom: string) => {
    return await prisma.role.update({
      where: { id },
      data: { nom },
    });
  };
  
  // Delete
  export const deleteRole = async (id: number) => {
    return await prisma.role.delete({
      where: { id },
    });
  };
  