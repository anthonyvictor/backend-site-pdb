import { Schema } from "mongoose";
import { IItem } from "../../../types/item";
import { IPizzaSabor } from "../../../types/pizza";

export const PizzaSaborSchema = new Schema<IPizzaSabor>({
  nome: { type: String },
  ingredientes: [{ type: String }],
});

export const ItemSchema = new Schema<IItem>({
  sabores: { type: [PizzaSaborSchema] },
  tamanho: { type: String },
  observacao: { type: String },
  valor: { type: Number, required: true },
});