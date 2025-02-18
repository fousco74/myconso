import { prisma } from "@/utils/prisma";

// Create
export const createPermission = async (nom: string) => {
    return await prisma.permission.create({
      data: { nom },
    });
  };
  
  // Read
  export const getPermissionById = async (id: number) => {
    return await prisma.permission.findUnique({
      where: { id },
      include: {
        role_permission: true,
      },
    });
  };
  
  export const getAllPermissions = async () => {
    return await prisma.permission.findMany({
      include: {
        role_permission: true,
      },
    });
  };
  
  // Update
  export const updatePermission = async (id: number, nom: string) => {
    return await prisma.permission.update({
      where: { id },
      data: { nom },
    });
  };
  
  // Delete
  export const deletePermission = async (id: number) => {
    return await prisma.permission.delete({
      where: { id },
    });
  };
  