"use server"
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js'
const prisma = new PrismaClient();

export const createClientAccount = async (
  typeCompteur: string,
  abonnement: string,
  nomOrg: string,
  typeClient: string,
  valeur_kw: string,
  indexDate: Date,
  email: string,
  password: string,
  fullName: string,
  numero: string
) => {
  // Initialiser le client Supabase
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // Vérifier si l'email est déjà utilisé
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Cet email est déjà utilisé.");
  }

  // Création de l'utilisateur dans Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data?.user?.id) {
    throw new Error(`Erreur lors de la création de l'utilisateur: ${error?.message || "Utilisateur non créé"}`);
  }

  const userId = data.user.id; // UUID de l'utilisateur Supabase

  try {
    // Exécuter la transaction Prisma
    const transaction = await prisma.$transaction(async (tx) => {
      // Création du client
      const client = await tx.client.create({
        data: {
          type_client: typeClient,
          nom_organisation: nomOrg,
        },
      });

      // Création du compteur
      const compteur = await tx.compteur.create({
        data: {
          abonnement,
          type_compteur: typeCompteur,
          client_id: client.id,
          periode: indexDate,
          numero_compteur: numero
        },
      });

      // Création de l'utilisateur dans la base de données
      await tx.user.create({
        data: {
          email,
          client_id: client.id,
          role_id: 1, // Défaut: rôle "1"
          nom_complet: fullName,
          userId, // UUID Supabase
        },
      });

      // Création de l'index
      await tx.index.create({
        data: {
          client_id: client.id,
          valeur_kw: parseInt(valeur_kw),
          created_at: indexDate,
          compteur_id: compteur.id,
        },
      });

      //connexion automatique
      const { error: connectError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (connectError) {
        throw new Error(`Erreur lors de la connexion avec l'utilisateur Supabase: ${connectError.message}`);
      }

      return true; // Succès
    });

    return transaction; // Retourner true si la transaction réussit
  } catch (err) {
    // Supprimer l'utilisateur de Supabase en cas d'échec
    const deleteUserResponse = await supabase.auth.admin.deleteUser(userId);
    if (deleteUserResponse.error) {
      console.error("Erreur lors de la suppression de l'utilisateur Supabase:", deleteUserResponse.error.message);
    }

    throw new Error("Échec de la création du compte, toutes les actions ont été annulées.");
  }
};


// Create a new client
export const createNewClient = async (type_client: string, nom_organisation: string) => {
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


