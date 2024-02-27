import mongoose from "mongoose";
import { IPromo } from "../../../types/promo";
import { PromoSchema } from "../schemas/promo";

export const PromoModel = mongoose.model<IPromo>("Promo", PromoSchema);
