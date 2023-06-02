import { Schema } from "mongoose";

export const ItemSchema = new Schema<IItem>({
  observacao: { type: String },
  valor: { type: Number, required: true },
});

export const PizzaSaborSchema = new Schema<IPizzaSabor>({
  nome: { type: String, required: true },
  ingredientes: [{ type: String, required: true }],
});

export const PizzaSchema = new Schema<IPizza>({
  sabores: { type: [PizzaSaborSchema], required: true },
  tamanho: { type: String, required: true },
  observacao: { type: String },
  valor: { type: Number, required: true },
});
