"use server"
import { createClient } from '@supabase/supabase-js'

import { prisma } from "@/utils/prisma";
import { UUID } from "crypto";


// Create
export const createUser = async (nom_complet: string, email: string, mot_de_passe: string, client_id: number, role_id: number) => {
    return await prisma.user.create({
      data: {
        nom_complet,
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

  export const getUserByEmail = async (email: string) =>{
    return await prisma.user.findFirst({
      where: {
        email
      }
    })
  }
  
  export const getAllUsers = async () => {
    return await prisma.user.findMany({
      include: {
        client: true,
        role: true,
      },
    });
  };

  export const createUserAccount = async (
    nom_complet: string,
    email: string,
    mot_de_passe: string,
    client_id: number,
    role_id: number
  ) => {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await prisma.user.findFirst({
      where: { email },
      select: { id: true },
    });
  
    if (existingUser) {
      throw new Error("L'utilisateur existe déjà");
    }
  
      // Initialiser le client Supabase
      const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
  
    // Utiliser une transaction pour assurer la cohérence entre Prisma et Supabase
    return await prisma.$transaction(async (tx) => {
      // Création de l'utilisateur dans Supabase
      const { error,data: supabaseUser } = await supabase.auth.signUp({
        email,
        password: mot_de_passe,
      });
  
      if (error) {
        throw new Error(`Échec de la création de l'utilisateur dans Supabase: ${error.message}`);
      }
  
      // Création de l'utilisateur dans Prisma
      return await tx.user.create({
        data: {
          nom_complet,
          email,
          client_id,
          role_id,
          userId: supabaseUser?.user?.id
        },
      });
    });
  };




  export const updateUserAccount = async (
    id: number,
    nom_complet: string,
    email: string,
    mot_de_passe: string,
    client_id: number,
    role_id: number,
    userUuid: string // UUID de l'utilisateur dans la table user de Prisma
  ) => {

    



    // Vérifier si l'utilisateur existe dans la base de données avec le `id`
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: { email: true}, // Sélectionner également `userId` qui est l'UUID de Supabase
    });
  
    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas.");
    }
  
    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });
  
      if (emailExists) {
        throw new Error("Un utilisateur avec cet email existe déjà.");
      }
    }
  
    // Initialiser le client Supabase
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  
    // Récupérer l'utilisateur dans Supabase à partir de `userId` qui correspond à `userUuid`
    const { data: { user } } = await supabase.auth.admin.getUserById(userUuid);
  
  
    // Vérification de l'UUID de l'utilisateur (on suppose que l'utilisateur de la base Prisma correspond à l'utilisateur Supabase)
    if (user?.id !== userUuid) {
      throw new Error("L'UUID de l'utilisateur ne correspond pas entre la base de données et Supabase.");
    }
  
    // Utiliser une transaction Prisma pour assurer la cohérence des mises à jour
    return await prisma.$transaction(async (tx) => {
      // Mise à jour dans Supabase
      const updateData: { email?: string; password?: string } = {};
  
      if (email !== existingUser.email) {
        updateData.email = email;
      }
      if (mot_de_passe !== "") {
        updateData.password = mot_de_passe;
      }
  
      if (Object.keys(updateData).length > 0) {
        const { error } = await supabase.auth.admin.updateUserById(userUuid, updateData);
        if (error) {
          throw new Error(`Échec de la mise à jour de l'utilisateur dans Supabase: ${error.message}`);
        }
      }
  
      // Mise à jour dans Prisma
      return await tx.user.update({
        where: { id },
        data: {
          nom_complet,
          email,
          client_id,
          role_id,
        },
      });
    });
  };
  

  export const deleteUserAccount = async (userId: string, id: number) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  
    // Suppression dans Supabase
    const { data: { user }, error } = await supabase.auth.admin.deleteUser(userId);
  
    if (error) {
      throw new Error(`Échec de la suppression de l'utilisateur dans Supabase: ${error.message}`);
    }
  

    return { user };
    
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
  



  
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );
  
  
  export const uploadProfileImage = async (
    file: File,
    userId: number
  ): Promise<string | null> => {
    try {
      if (!file) throw new Error("Aucun fichier sélectionné");
  
      // Vérifier le type de fichier (PNG, JPEG, JPG seulement)
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Format d'image non autorisé (PNG, JPEG, JPG seulement)");
      }
  
      // Vérifier la taille du fichier (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error("L'image dépasse la taille maximale de 5MB");
      }
  
      // 1️⃣ Récupérer l'ancienne image de profil depuis la base de données
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { profile: true },
      });
  
      // 2️⃣ Supprimer l'ancienne image si elle existe
      if (user?.profile) {
        const filePath = user.profile.split("/").pop(); // Récupère le nom du fichier
        if (filePath) {
          await supabase.storage.from("users-pictures").remove([`profiles/${filePath}`]);
        }
      }
  
      // 3️⃣ Générer un nom de fichier unique
      const fileName = `profiles/${userId}-${Date.now()}.${file.name.split(".").pop()}`;
  
      // 4️⃣ Téléverser la nouvelle image
      const { error: uploadError } = await supabase.storage
        .from("users-pictures")
        .upload(fileName, file);
  
      if (uploadError) throw uploadError;
  
      // 5️⃣ Récupérer l'URL publique de la nouvelle image
      const { data } = supabase.storage.from("users-pictures").getPublicUrl(fileName);
      if (!data?.publicUrl) throw new Error("Impossible d'obtenir l'URL de l'image");
  
      // 6️⃣ Mettre à jour l'URL de l'image de profil dans la base de données
      await prisma.user.update({
        where: { id: userId },
        data: { profile: data.publicUrl },
      });
  
      return data.publicUrl;
    } catch (error) {
      console.error("Erreur lors du téléversement :", error.message);
      return null;
    }
  };
  


// Fonction pour supprimer une image de profil
const deleteProfileImage = async (imageUrl: string) => {

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    if (!imageUrl) throw new Error("Aucune image à supprimer");

    // Extraire le chemin du fichier depuis l'URL
    const filePath = imageUrl.split('/avatars/')[1];

    // Supprimer l'image de Supabase
    const { error } = await supabase.storage.from('avatars').remove([filePath]);
    if (error) throw error;

    console.log("Image supprimée avec succès !");
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error.message);
    return false;
  }
};


// Fonction pour mettre à jour l'image de profil
export const updateProfileImage = async (userId: string, newFile: File) => {
  
  try {
    // Récupérer l'utilisateur et son ancienne image
    const user = await prisma.user.findUnique({ where: { userId }, select: { profile: true } });
    if (!user) throw new Error("Utilisateur introuvable");

    // Supprimer l'ancienne image si elle existe
    if (user.profile) {
      await deleteProfileImage(user.profile);
    }

    // Téléverser la nouvelle image
    const newImageUrl = await uploadProfileImage(newFile, userId);
    if (!newImageUrl) throw new Error("Erreur lors du téléversement de la nouvelle image");

    // Mettre à jour la base de données
    await prisma.user.update({ where: { userId }, data: { profile: newImageUrl } });

    return newImageUrl;
  } catch
  (error) {
    console.error("Erreur lors de la mise à jour de l'image de profil :", error.message);
    return null;
  }
};