/*
  Warnings:

  - Added the required column `candidateId` to the `Candidature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidature" ADD COLUMN     "candidateId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidature" ADD CONSTRAINT "Candidature_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
