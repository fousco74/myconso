"use server"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//create,
export const createIndex = async (valeur_kw: number, userId: number, compteur_id: number, indexDate: Date) => {

  if (isNaN(compteur_id) || isNaN(userId)) {
    throw new Error('Invalid data provided');
  }

  return await prisma.index.create({
    data: {
      valeur_kw,
      compteur_id,
      user_id: userId,
      created_at: indexDate,
    },
  });


  
};

export const getLastIndex = async (userId: number, compterId: number) => {
  return await prisma.index.findFirst({
    where: {
      user_id: userId,
      compteur_id: compterId,
    },
    orderBy: {
      id: "desc",
    },
  });

};

export const getIndexToday = async (userId: number, compterId: number): Promise<boolean> => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Début du jour (00:00:00)

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); // Fin du jour (23:59:59)

  const indexToday = await prisma.index.findFirst({
    where: {
      user_id: userId,
      compteur_id: compterId,
      created_at: {
        gte: todayStart, // Après 00:00:00 du jour
        lte: todayEnd,   // Avant 23:59:59 du jour
      },
    },
  });

  return indexToday !== null;
};



export const getIndexById = async (id: number) => {
  return await prisma.index.findUnique({
    where: { id },
    include: {
      compteur: true,
    },
  });
};

export const getAllIndexes = async () => {
  return await prisma.index.findMany({
    include: {
      compteur: true,
    },
  });
};

export const updateIndex = async (formData: FormData, id: number, userId: number) => {
  const valeur_kw = parseFloat(formData.get('valeur_kw') as string);
  const compteur_id = parseInt(formData.get('compteur_id') as string);

  if (isNaN(valeur_kw) || isNaN(compteur_id)) {
    throw new Error('Invalid data provided');
  }

  return await prisma.index.update({
    where: { id },
    data: {
      valeur_kw,
      compteur_id,
      user_id: userId,
    },
  });
};

export const deleteIndex = async (id: number) => {
  return await prisma.index.delete({
    where: { id },
  });
};


export const calculerFacture = async (userId: number, compteurId: number) => {
  return await prisma.$transaction(async (tx) => {
    
    const dernierIndex = await tx.index.findFirst({
      where: {
        user_id: userId,
        compteur_id: compteurId,
      },
      orderBy: {
        id: "desc",
      },
    });

    const allIndex = await tx.index.findMany({
      where: {
        user_id: userId,
        compteur_id: compteurId,
      },
      orderBy: {
        id: "asc",
      },
    });

    // Récupérer le premier index
    const premierIndex = await tx.index.findFirst({
      where: {
        user_id: userId,
        compteur_id: compteurId,
      },
      orderBy: {
        id: "asc",
      },
    });

    if (!dernierIndex || !premierIndex) {
      console.log("Impossible de récupérer les index.");
      return dernierIndex
    }
    const tarifUnitaire = 104.43;
    const tva = 0.18;
    const primeFixe = Math.ceil(49580 * (1 + tva));

    // Calcul de la consommation
    if(allIndex.length > 1){

      const consommation = dernierIndex.valeur_kw - premierIndex.valeur_kw;
      const A = Math.ceil((consommation * tarifUnitaire) * (1 + tva));

        // Calcul de la facture
      const totalFacture = A + primeFixe;


     return {
      consommation,
      montantHT: Math.ceil(consommation * tarifUnitaire), 
      montantTTC: A,
      primeFixe,
      totalFacture
    };
    }else{

     
      
      const consommation = allIndex[0].valeur_kw;
      const A = Math.ceil((consommation * tarifUnitaire) * (1 + tva));

        // Calcul de la facture
      const totalFacture = A + primeFixe;


     return {
      consommation,
      montantHT: Math.ceil(consommation * tarifUnitaire), 
      montantTTC: A,
      primeFixe,
      totalFacture
    };

    }

 
   

  
    


    
  });
};


export const recorderIndexConso = async (user_id: number, compteur_id: number, valeur_kw: number, consommation_kw: number, consommation_fcfa: number, index_depart_id: number, client_id: number) => {
  return await prisma.$transaction(async (tx) => {

    const index = await tx.index.create({
      data: {
        valeur_kw,
        compteur_id,
        user_id: user_id,
      },
    });

  const index_fin_id = index.id;

  const consommation = await tx.consommation.create({
      data: {
        consommation_kw,
        consommation_fcfa,
        index_depart_id,
        index_fin_id,
        compteur_id,
        client_id,
      },
    });

    return {
      newConsommation : consommation ,
      newIndex: index, 
      
    };

});

};