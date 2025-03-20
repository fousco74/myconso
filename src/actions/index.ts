"use server"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//create,
export const createIndex = async (
  valeur_kw: number, 
  client_id: number, 
  compteur_id: number, 
  indexDate: Date
) => {

  if (isNaN(compteur_id) || isNaN(client_id) || isNaN(valeur_kw)) {
    throw new Error('Invalid data provided');
  }

  return await prisma.index.create({
    data: {
      valeur_kw: Math.ceil(valeur_kw), // ✅ Arrondir avant d'enregistrer
      compteur_id,
      client_id: client_id,
      created_at: indexDate,
    },
  });
};


export const getLastIndex = async (client_id: number, compterId: number) => {
  return await prisma.index.findFirst({
    where: {
      client_id: client_id,
      compteur_id: compterId,
    },
    orderBy: {
      id: "desc",
    },
  });

};

export const getIndexToday = async (client_id: number, compterId: number): Promise<boolean> => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Début du jour (00:00:00)

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); // Fin du jour (23:59:59)

  const indexToday = await prisma.index.findFirst({
    where: {
      client_id: client_id,
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

export const updateIndex = async ( id: number, client_id: number, valeur_kw: number, compteur_id: number) => {
  

  if (isNaN(valeur_kw) || isNaN(compteur_id)) {
    throw new Error('Invalid data provided');
  }

  return await prisma.index.update({
    where: { id },
    data: {
      valeur_kw,
      compteur_id,
      client_id: client_id,
    },
  });
};

export const deleteIndex = async (id: number) => {
  return await prisma.index.delete({
    where: { id },
  });
};

export const updateCalculerFacture = async (client_id: number, compteurId: number, debutPeriode: Date, finPeriode: Date) => {
  return await prisma.$transaction(async (tx) => {
    // Vérifier si le compteur existe
    const compteur = await tx.compteur.findUnique({
      where: { id: compteurId, client_id: client_id },
      select: { id: true },
    });

    if (!compteur) {
      console.log("Compteur introuvable.");
      return null;
    }

    console.log(`Calcul de la facture pour la période : Du ${debutPeriode.toLocaleDateString()} au ${finPeriode.toLocaleDateString()}`);

    // Récupérer les index correspondant à la période sélectionnée
    const indexDansPeriode = await tx.index.findMany({
      where: {
        client_id: client_id,
        compteur_id: compteurId,
        created_at: {
          gte: debutPeriode,
          lt: finPeriode,
        },
      },
      orderBy: { created_at: "asc" },
    });

    let premierIndex, dernierIndex;

    if (indexDansPeriode.length === 0) {
      console.log("Aucun index trouvé pour cette période. Facture = 0.");
      return {
        consommation: 0,
        montantHT: 0,
        montantTTC: 0,
        primeFixe: 0,
        totalFacture: 0,
        debutPeriode,
        finPeriode,
      };
    } else if (indexDansPeriode.length === 1) {
      console.log("Un seul index trouvé, récupération du dernier index du mois précédent...");
      
      const dernierIndexPrecedent = await tx.index.findFirst({
        where: {
          client_id: client_id,
          compteur_id: compteurId,
          created_at: {
            lt: debutPeriode,
          },
        },
        orderBy: { created_at: "desc" },
      });

      if (!dernierIndexPrecedent) {
        console.log("Aucun index précédent trouvé. Facture = 0.");
        return {
          consommation: 0,
          montantHT: 0,
          montantTTC: 0,
          primeFixe: 0,
          totalFacture: 0,
          debutPeriode,
          finPeriode,
        };
      }

      premierIndex = dernierIndexPrecedent;
      dernierIndex = indexDansPeriode[0];
    } else {
      premierIndex = indexDansPeriode[0];
      dernierIndex = indexDansPeriode[indexDansPeriode.length - 1];
    }

    // Tarifs et calculs
    const tarifUnitaire = 104.43;
    const tva = 0.18;
    const primeFixe = Math.ceil(49580 * (1 + tva));

    const consommation = dernierIndex.valeur_kw - premierIndex.valeur_kw;
    const montantHT = Math.ceil(consommation * tarifUnitaire);
    const montantTTC = Math.ceil(montantHT * (1 + tva));
    const totalFacture = montantTTC + primeFixe;

    return {
      consommation,
      montantHT,
      montantTTC,
      primeFixe,
      totalFacture,
      debutPeriode,
      finPeriode,
    };
  });
};



export const calculerFacture = async (client_id: number, compteurId: number) => {
  return await prisma.$transaction(async (tx) => {
    // Fonction de formatage de date
    const formatDate = (date: Date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
    };

    // Récupération du compteur avec sa période de référence
    const compteur = await tx.compteur.findUnique({
      where: { id: compteurId, client_id },
      select: { periode: true }
    });

    if (!compteur?.periode) {
      throw new Error("Compteur introuvable ou période non définie");
    }

    // Conversion de la période de référence en Date
    const periodeRef = new Date(compteur.periode);
    const today = new Date();

    // Calcul du nombre de périodes complètes écoulées
    const diffEnMois =
      (today.getFullYear() - periodeRef.getFullYear()) * 12 +
      today.getMonth() - periodeRef.getMonth();
    const periodesEcoulees = Math.floor(diffEnMois / 2);

    // Calcul de la période courante
    const debutPeriode = new Date(periodeRef);
    debutPeriode.setMonth(periodeRef.getMonth() + periodesEcoulees * 2);

    const finPeriode = new Date(debutPeriode);
    finPeriode.setMonth(debutPeriode.getMonth() + 2);

    // Ajustement si on dépasse la date actuelle
    if (today < finPeriode) {
      finPeriode.setDate(today.getDate());
    }

    console.log(
      `📅 Période facturée : ${debutPeriode.toISOString()} - ${finPeriode.toISOString()}`
    );

    // Récupération des index dans la période
    const indexDansPeriode = await tx.index.findMany({
      where: {
        client_id,
        compteur_id: compteurId,
        created_at: { gte: debutPeriode, lte: finPeriode }
      },
      orderBy: { created_at: 'asc' }
    });

    // Gestion des cas spéciaux
    let premierIndex = indexDansPeriode[0];
    let dernierIndex = indexDansPeriode[indexDansPeriode.length - 1];

    // Si aucun index dans la période
    if (indexDansPeriode.length === 0) {
      return {
        periode: `Du ${formatDate(debutPeriode)} Au ${formatDate(finPeriode)}`,
        consommation: 0,
        montantHT: 0,
        montantTTC: 0,
        primeFixe: 0,
        totalFacture: 0
      };
    }

    // Si un seul index, on cherche le précédent
    if (indexDansPeriode.length === 1) {
      const indexPrecedent = await tx.index.findFirst({
        where: {
          client_id,
          compteur_id: compteurId,
          created_at: { lt: debutPeriode }
        },
        orderBy: { created_at: 'desc' }
      });

      if (indexPrecedent) {
        premierIndex = indexPrecedent;
      }
    }

    // Calculs financiers
    const consommation = dernierIndex.valeur_kw - premierIndex.valeur_kw;
    const tarifUnitaire = 104.43;
    const tva = 0.18;

    const montantHT = Math.ceil(consommation * tarifUnitaire);
    const montantTTC = Math.ceil(montantHT * (1 + tva));
    const primeFixe = Math.ceil(49580 * (1 + tva));
    const totalFacture = montantTTC + primeFixe;

    return {
      periode: `Du ${formatDate(premierIndex.created_at)} Au ${formatDate(dernierIndex.created_at)}`,
      consommation,
      montantHT,
      montantTTC,
      primeFixe,
      totalFacture
    };
  });
};





export const calculerFacturesPeriodesPassees = async (
  client_id: number,
  compteurId: number,
  periodes: { name: string; value: string }[]
) => {
  if (!Array.isArray(periodes)) {
    console.error("❌ periodes n'est pas un tableau :", periodes);
    return [];
  }

  const moisNoms = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
  ];

  const factures = [];
  const today = new Date();
  console.log("today :", today);

  for (const periodeObj of periodes) {
    if (!periodeObj || typeof periodeObj.value !== "string") {
      console.error(`⚠️ Type invalide pour periode:`, periodeObj);
      continue;
    }

    const periode = periodeObj.value;
    const [startStr, endStr] = periode.split(" - ");
    const startParts = startStr.split("/").map(Number);
    const endParts = endStr.split("/").map(Number);

    if (startParts.length !== 3 || endParts.length !== 3) {
      console.error(`❌ Format incorrect pour la période : ${periode}`);
      continue;
    }

    const [dayDebut, moisDebut, anneeDebut] = startParts;
    const [dayFin, moisFin, anneeFin] = endParts;

    const debutPeriode = new Date(anneeDebut, moisDebut - 1, dayDebut);
    const finPeriode = new Date(anneeFin, moisFin - 1, dayFin);
    console.log(`📅 Période de facturation : ${debutPeriode.toLocaleDateString()} au ${finPeriode.toLocaleDateString()}`);

    if (finPeriode > today) {
      console.log(`🔴 Période ${debutPeriode.toLocaleDateString()} est future, ignorée.`);
      continue;
    }

    const periodeNom = `${moisNoms[moisDebut - 1]} - ${moisNoms[moisFin - 1]}`;
    console.log(`📅 Calcul de la facture pour la période : ${periodeNom}`);

    const debutPeriodeDate = new Date(debutPeriode);
    const finPeriodeDate = new Date(finPeriode);
    finPeriodeDate.setDate(finPeriodeDate.getDate() + 1);

    const IndexAll = await prisma.index.findMany({
      where: {
        client_id: client_id,
        compteur_id: compteurId,
        created_at: {
          gte: debutPeriodeDate,
          lte: finPeriodeDate,
        },
      },
      orderBy: { created_at: "asc" },
    });

    console.log("premierIndex all:", IndexAll);

    const premierIndex = IndexAll[0];
    const dernierIndex = IndexAll[IndexAll.length - 1];

    if (!premierIndex || !dernierIndex || premierIndex.id === dernierIndex.id) {
      console.log("Aucun index suffisant trouvé pour le calcul. Facture = 0.");
      factures.push({
        dateRange: `Du ${debutPeriode.toLocaleDateString()} Au ${finPeriode.toLocaleDateString()}`,
        date: periodeNom,
        periodeCalcul: "-",
        section1Data: [
          "Numéro de compteur", "Ancien Index", "Nouveau Index", 
          "Différence", "Coefficient de lecture", "Consommation (kWh)"
        ],
        section1Value: ["-", "-", "-", "-", "-", "-"],
        section2Data: [
          "Tranches", "Prix Unitaire HT (Fcfa)", "Consommation (kWh)", 
          "Montant HT (Fcfa)", "Taux de TVA (%)", "Montant TVA (Fcfa)", 
          "Montant TTC (Fcfa)"
        ],
        section2Value: ["-", "-", "-", "-", "-", "-", "-"],
        section3Data: [
          [["Prime fixe"], ["-", "-", "-", "-", "-"]],
          [["Total Facture Énergie"], ["-", "-", "-", "-", "-"]]
        ],
        totalAmount: "0",
        periode: periode,
      });
      continue;
    }

    // ✅ Calcul avec arrondis
    const tarifUnitaire = 104.43;
    const tva = 0.18;
    const primeFixe = Math.ceil(49580 * (1 + tva));

    const consommation = Math.ceil(dernierIndex.valeur_kw - premierIndex.valeur_kw);
    const montantHT = Math.ceil(consommation * tarifUnitaire);
    const montantTTC = Math.ceil(montantHT * (1 + tva));
    const totalFacture = Math.ceil(montantTTC + primeFixe);

    // ✅ Arrondi les valeurs affichées
    const section1Data = [
      "Numéro de compteur",
      "Ancien Index",
      "Nouveau Index",
      "Différence",
      "Coefficient de lecture",
      "Consommation (kWh)",
    ];
    const section1Value = [
      premierIndex.compteur?.numero_compteur || "-",
      premierIndex.valeur_kw,
      dernierIndex.valeur_kw,
      consommation,
      "1.0",
      consommation,
    ];

    const section2Data = [
      "Tranches",
      "Prix Unitaire HT (Fcfa)",
      "Consommation (kWh)",
      "Montant HT (Fcfa)",
      "Taux de TVA (%)",
      "Montant TVA (Fcfa)",
      "Montant TTC (Fcfa)",
    ];
    const section2Value = [
      "1",
      Math.ceil(tarifUnitaire).toString(),
      consommation.toString(),
      montantHT.toString(),
      (tva * 100).toString(),
      Math.ceil(montantHT * tva).toString(),
      montantTTC.toString(),
    ];

    const section3Data = [
      [
        ["Prime fixe"],
        [
          "-",
          "49580",
          (tva * 100).toString(),
          Math.ceil(49580 * tva).toString(),
          primeFixe.toString(),
        ],
      ],
      [
        ["Total Facture Énergie"],
        [
          "-",
          montantHT.toString(),
          "-",
          Math.ceil(montantHT * tva).toString(),
          totalFacture.toString(),
        ],
      ],
    ];

    factures.push({
      dateRange: `Du ${debutPeriode.toLocaleDateString()} Au ${finPeriode.toLocaleDateString()}`,
      date: periodeNom,
      periodeCalcul: `Du ${premierIndex.created_at.toLocaleDateString()} Au ${dernierIndex.created_at.toLocaleDateString()}`,
      section1Data,
      section1Value,
      section2Data,
      section2Value,
      section3Data,
      totalAmount: totalFacture.toString(),
      periode: periode,
    });
  }

  return factures;
};









export const factureAllPeriode = async (client_id: number, compteurId: number) => {
  try {
  
      const compteur = await prisma.compteur.findUnique({ where: { id: compteurId } });

      if (!compteur || !compteur.periode) {
        console.log("Compteur introuvable ou période non définie.");
        return null;
      }

      const datePeriode = new Date(compteur.periode);
      const today = new Date();

      if (datePeriode > today) {
        console.log("La période du compteur est dans le futur.");
        return [];
      }

      const moisNoms = ["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"];

      const addMonths = (date: Date, months: number) => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + months);
        return newDate;
      };

      const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const periodes: { name: string; value: string }[] = [];
      let currentStart = datePeriode;
      let currentEnd =  addMonths(currentStart, 2);

      while (currentEnd < today) {

        periodes.push({
          name: `${moisNoms[currentStart.getMonth()]}-${moisNoms[currentEnd.getMonth()]}`,
          value: `${formatDate(currentStart)} - ${formatDate(currentEnd)}`
        });

        currentStart = currentEnd;
        currentEnd = addMonths(currentStart, 2);
      }

      return periodes;
  } catch (error) {
    console.error("Erreur Prisma:", error);
    return null;
  }
};







export const recorderIndexConso = async (compteur_id: number, valeur_kw: number, consommation_kw: number, consommation_fcfa: number, index_depart_id: number, client_id: number, indexDate: Date) => {
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
      },
    });

    return {
      newConsommation : consommation ,
      newIndex: index, 
      
    };

});

};


const searchIndex = async (client_id: number, compteurId: number, date_start?: Date, date_end?: Date) => {
  return await prisma.index.findMany({
    where: {
      client_id: client_id,
      compteur_id: compteurId,
      created_at: {
        gte: date_start,
        lt: date_end,
      },
    },
  });
};


export const calculerFacturePredire = async (indexDepart: number, indexArrivee: number) => {
  const tarifUnitaire = 104.43;
  const tva = 0.18;
  const primeFixe = Math.ceil(49580 * (1 + tva));

  const consommation = indexArrivee - indexDepart;
  const montantHT = Math.ceil(consommation * tarifUnitaire);
  const montantTTC = Math.ceil(montantHT * (1 + tva));
  const totalFacture = montantTTC + primeFixe;

  return {
    consommation,
    montantHT,
    montantTTC,
    primeFixe,
    totalFacture
  };
};
