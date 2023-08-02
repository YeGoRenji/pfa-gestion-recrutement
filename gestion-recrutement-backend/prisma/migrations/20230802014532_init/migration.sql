-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('JOB_OFFER', 'INTERNSHIP_OFFER');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('REMOTE', 'OFFICE', 'HYBRID');

-- CreateEnum
CREATE TYPE "CandidatureType" AS ENUM ('INTERNSHIP', 'JOB', 'OFFER');

-- CreateEnum
CREATE TYPE "InternshipType" AS ENUM ('PFE', 'PFA', 'Stage_ETE');

-- CreateTable
CREATE TABLE "Administrator" (
    "userId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "userId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Offer" (
    "offerId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "nbOfPositions" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "contract" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "type" "OfferType" NOT NULL,
    "location" "Location" NOT NULL,
    "managerId" INTEGER NOT NULL,
    "concernId" INTEGER NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("offerId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profileId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "requiredProfile" TEXT NOT NULL,
    "desiredSkills" TEXT[],
    "stronglyAppreciate" TEXT[],
    "languages" TEXT[],

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "Candidature" (
    "candidatureId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "educationLvl" TEXT NOT NULL,
    "techSkills" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "type" "CandidatureType" NOT NULL,

    CONSTRAINT "Candidature_pkey" PRIMARY KEY ("candidatureId")
);

-- CreateTable
CREATE TABLE "InternshipCandidature" (
    "candidatureId" INTEGER NOT NULL,
    "internType" "InternshipType" NOT NULL,
    "desiredTechnology" TEXT NOT NULL,
    "InternshipDuration" INTEGER NOT NULL,

    CONSTRAINT "InternshipCandidature_pkey" PRIMARY KEY ("candidatureId")
);

-- CreateTable
CREATE TABLE "JobCandidature" (
    "candidatureId" INTEGER NOT NULL,
    "durationOfExp" INTEGER NOT NULL,
    "lastPostOcc" TEXT NOT NULL,
    "desiredPosition" TEXT NOT NULL,

    CONSTRAINT "JobCandidature_pkey" PRIMARY KEY ("candidatureId")
);

-- CreateTable
CREATE TABLE "OfferCandidature" (
    "candidatureId" INTEGER NOT NULL,
    "durationOfExp" INTEGER NOT NULL,
    "offerId" INTEGER,

    CONSTRAINT "OfferCandidature_pkey" PRIMARY KEY ("candidatureId")
);

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Administrator"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_concernId_fkey" FOREIGN KEY ("concernId") REFERENCES "Profile"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipCandidature" ADD CONSTRAINT "InternshipCandidature_candidatureId_fkey" FOREIGN KEY ("candidatureId") REFERENCES "Candidature"("candidatureId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCandidature" ADD CONSTRAINT "JobCandidature_candidatureId_fkey" FOREIGN KEY ("candidatureId") REFERENCES "Candidature"("candidatureId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferCandidature" ADD CONSTRAINT "OfferCandidature_candidatureId_fkey" FOREIGN KEY ("candidatureId") REFERENCES "Candidature"("candidatureId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferCandidature" ADD CONSTRAINT "OfferCandidature_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("offerId") ON DELETE SET NULL ON UPDATE CASCADE;
