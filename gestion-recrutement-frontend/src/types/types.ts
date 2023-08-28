import {
  Offer,
  Profile,
} from "../../../gestion-recrutement-backend/node_modules/@prisma/client";

export type OfferRowType = Offer & { profile: Profile };
