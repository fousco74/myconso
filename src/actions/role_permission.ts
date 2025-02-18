import { prisma } from "@/utils/prisma";

// Create
export const createRolePermission = async (role_id: number, permission_id: number) => {
    return await prisma.role_permission.create({
      data: {
        role_id,
        permission_id,
      },
    });
  };
  
  // Read
  export const getRolePermissionById = async (id: number) => {
    return await prisma.role_permission.findUnique({
      where: { id },
      include: {
        role: true,
        permission: true,
      },
    });
  };
  
  export const getAllRolePermissions = async () => {
    return await prisma.role_permission.findMany({
      include: {
        role: true,
        permission: true,
      },
    });
  };
  
  // Delete
  export const deleteRolePermission = async (id: number) => {
    return await prisma.role_permission.delete({
      where: { id },
    });
  };
  