import mongoose from "mongoose";
import { ILoja } from "../../../types/loja";
import { LojaSchema } from "../schemas/loja";

export const LojaModel = mongoose.model<ILoja>("lojas", LojaSchema);
