/*
  Warnings:

  - You are about to drop the column `consomation_fcfa` on the `consommation` table. All the data in the column will be lost.
  - Added the required column `consommation_fcfa` to the `consommation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consommation" DROP COLUMN "consomation_fcfa",
ADD COLUMN     "consommation_fcfa" DOUBLE PRECISION NOT NULL;
