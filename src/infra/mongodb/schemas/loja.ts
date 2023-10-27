import { Schema } from "mongoose";
import { ILoja } from "../../../types/loja";

export const LojaSchema = new Schema<ILoja>({
  
  closedUntil: {
    type: Date, required: false
  }
});
