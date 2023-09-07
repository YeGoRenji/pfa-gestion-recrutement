import {
  Offer,
  Profile,
  Candidature
} from "../../../gestion-recrutement-backend/node_modules/@prisma/client";

export type OfferRowType = Offer & { profile: Profile };
export type ProfileType = Profile;
export type AppsType = Candidature;
export type OfferInputType = Omit<
  Offer,
  "offerId" | "createdAt" | "modifiedAt" | "isArchived" | "managerId"
>;

export type UserType = {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  email: string;
}
