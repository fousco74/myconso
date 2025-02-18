import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new client
export const createClient = async (type_client: string, nom_organisation: string) => {
  return await prisma.client.create({
    data: {
      type_client,
      nom_organisation,
    },
  });
};

// Get a client by ID
export const getClientById = async (id: number) => {
  return await prisma.client.findUnique({
    where: { id },
    include: {
      compteur: true,   
      user: true,     
    },
  });
};

// Get all clients
export const getAllClients = async () => {
  return await prisma.client.findMany({
    include: {
      compteur: true,  
      user: true,     
    },
  });
};

// Update client details
export const updateClient = async (id: number, type_client: string, nom_organisation: string) => {
  return await prisma.client.update({
    where: { id },
    data: {
      type_client,
      nom_organisation,
    },
  });
};

// Delete a client
export const deleteClient = async (id: number) => {
  return await prisma.client.delete({
    where: { id },
  });
};


