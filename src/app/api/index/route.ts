import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";


import { NextApiRequest, NextApiResponse } from 'next';

// Fonction pour enregistrer un index et une consommation
const recorderIndexConso = async (
  compteur_id: number,
  valeur_kw: number,
  consommation_kw: number,
  consommation_fcfa: number,
  index_depart_id: number,
  client_id: number,
  indexDate: Date
) => {
  return await prisma.$transaction(async (tx) => {
    const index = await tx.index.create({
      data: {
        valeur_kw,
        compteur_id,
        client_id: client_id,
        created_at: indexDate,
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
        created_at: indexDate,
      },
    });

    return {
      newConsommation: consommation,
      newIndex: index,
    };
  });
};


// Fonction utilitaire pour gérer et logger les erreurs
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error("Erreur détectée :", error.message);
    console.error(error.stack);
  } else {
    console.error("Erreur inattendue :", error);
  }
  // On retourne toujours un objet comme payload pour éviter des erreurs de type
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}

// API handler pour l'enregistrement de l'index (POST)
export async function POST(request: Request) {
  try {
    // Extraction et vérification des champs requis
    const { valeur_kw, compteur_id, client_id, index_depart_id, indexDate, indexHeure } = await request.json();
    if (!valeur_kw || !client_id || !compteur_id || !index_depart_id || !indexDate || !indexHeure) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Vérification si le client existe
    const client = await prisma.client.findUnique({ where: { id: client_id } });
    if (!client) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }

    // Récupération de l'index précédent
    const oldIndex = await prisma.index.findFirst({
      where: { client_id, compteur_id },
      orderBy: { created_at: 'desc' },
    });

    console.log("oldIndex", oldIndex);
    console.log("valeur_kw", valeur_kw);
    if (!oldIndex) {
      return NextResponse.json({ message: "Previous index not found" }, { status: 404 });
    }

    // Vérification de la cohérence des index
    if (oldIndex.valeur_kw > parseFloat(valeur_kw)) {
      return NextResponse.json({ message: "Previous index cannot be greater than the current index" }, { status: 400 });
    }

    // Calcul des consommations
    const consommation_kw = parseFloat(valeur_kw) - oldIndex.valeur_kw;
    const consommation_fcfa = parseFloat(valeur_kw) * 104.33;

    // Conversion de la date et de l'heure
    const [day, month, year] = indexDate.split('/').map(num => num.padStart(2, '0'));
    const [hour, minute] = indexHeure.toUpperCase().split('H');
    const dateFormatted = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

    // Enregistrement de l'index et de la consommation
    const { newConsommation, newIndex } = await recorderIndexConso(
      parseInt(compteur_id.toString()),
      parseFloat(valeur_kw),
      consommation_kw,
      consommation_fcfa,
      oldIndex.id,
      client_id,
      dateFormatted
    );

    return NextResponse.json({
      message: "Index and consumption recorded successfully",
      newConsommation,
      newIndex,
    }, { status: 200 });

  } catch (error) {
    return handleError(error);
  }
}



export async  function GET(){

  const data = await prisma.index.findMany({
    orderBy: {
      id: 'asc'
    }
  });

  if(data !=null && data!=undefined)
  return  NextResponse.json({
    message : 'successfull',
    data : data
  },{status : 200});
}

