"use server"
import { prisma } from "@/utils/prisma";

export const createConsommation = async (
  consommation_kw: number,
  consommation_fcfa: number,
  index_depart_id: number,
  index_fin_id: number,
  compteur_id: number,
  client_id: number
) => {
  return await prisma.consommation.create({
    data: {
      consommation_kw,
      consommation_fcfa,
      index_depart_id,
      index_fin_id,
      compteur_id,
      client_id,
    },
  });
};

export const getConsommationById = async (id: number) => {
  return await prisma.consommation.findUnique({
    where: { id },
    include: {
      client: true,
      compteur: true,
      index_consommation_index_depart_idToindex: true,
      index_consommation_index_fin_idToindex: true,
    },
  });
};


export const updateConsommation = async (
  id: number,
  consommation_kw: number,
  consommation_fcfa: number,
  index_depart_id: number,
  index_fin_id: number,
  compteur_id: number,
  client_id: number
) => {
  return await prisma.consommation.update({
    where: { id },
    data: {
      consommation_kw,
      consommation_fcfa,
      index_depart_id,
      index_fin_id,
      compteur_id,
      client_id,
    },
  });
};


export const deleteConsommation = async (id: number) => {
  return await prisma.consommation.delete({
    where: { id },
  });
};


export const getMonthlyConsommation = async (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1); // Premier jour du mois
  const endDate = new Date(year, month, 1);         // Premier jour du mois suivant

  return await prisma.consommation.findMany({
    where: {
      created_at: {
        gte: startDate,
        lt: endDate,
      },
    },
    include: {
      client: true,
      compteur: true,
      index_consommation_index_depart_idToindex: true,
      index_consommation_index_fin_idToindex: true,
    },
  });
};


export const getWeeklyConsommation = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return await prisma.consommation.findMany({
    where: {
      created_at: {
        gte: sevenDaysAgo,
      },
    },
    include: {
      client: true,
      compteur: true,
      index_consommation_index_depart_idToindex: true,
      index_consommation_index_fin_idToindex: true,
    },
  });
};


export const getConsommationForPeriod = async (nbDays: number) => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - nbDays);

  return await prisma.consommation.findMany({
    where: {
      created_at: {
        gte: pastDate,
      },
    },
    include: {
      client: true,
      compteur: true,
      index_consommation_index_depart_idToindex: true,
      index_consommation_index_fin_idToindex: true,
    },
  });
};