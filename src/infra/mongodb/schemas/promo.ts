import { Schema } from "mongoose";
import { IPromo } from "../../../types/promo";

export const PromoSchema = new Schema<IPromo>({
  nome: { type: String, required: true },
  ativa: { type: Boolean, required: true },
  modal: {
    imagemUrl: { type: String },
    route: { type: String, required: true },
  },
});
