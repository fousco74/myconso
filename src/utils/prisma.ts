import { PrismaClient } from "@prisma/client";

// Type-safe global variable declaration
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

// Configuration optimisée pour différents environnements
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn", "info"] 
    : ["error"],
  errorFormat: "minimal",
});

// Conservation de l'instance en développement pour éviter les fuites mémoire
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Optional: Ajout de hooks de débogage en développement
if (process.env.NODE_ENV === "development") {
  prisma.$on("query" as never, (e: never) => {
    console.log("Query: " + (e as { query: string }).query);
    console.log("Params: " + (e as { params: string }).params);
    console.log("Duration: " + (e as { duration: number }).duration + "ms");
  });
}

export default prisma;