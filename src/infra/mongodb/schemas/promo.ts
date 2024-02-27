import { Schema } from "mongoose";
import { IPromo } from "../../../types/promo";

export const PromoSchema = new Schema<IPromo>({
  nome: { type: String },
  ativa: { type: Boolean },
  imagemUrl: { type: String },
});
