import { Schema } from "mongoose";
import { IItem } from "../../../types/item";
import { IPizzaGrupo, IPizzaSabor, IPizzaTamanho } from "../../../types/pizza";
import { IOutro } from "../../../types/outro";

export const PizzaSaborSchema = new Schema<IPizzaSabor>({
  nome: { type: String },
  ingredientes: [{ type: String }],
  disponivel: { type: Boolean },
  grupoId: { type: String },
  valores: [{ type: { tamanhoId: { type: String }, valor: { type: Number } } }],
});

export const PizzaGrupoSchema = new Schema<IPizzaGrupo>({
  nome: { type: String },
  sabores: { type: [PizzaSaborSchema] },
});

export const PizzaTamanhoSchema = new Schema<IPizzaTamanho>({
  nome: { type: String },
  maxSabores: { type: Number },
  fatias: { type: Number },
  tamanhoAprox: { type: Number },
  visivel: { type: Boolean },
  ativado: { type: Boolean },
  uuid: { type: String },
});

export const OutroSchema = new Schema<IOutro>({
  nome: { type: String },
  disponivel: { type: Boolean },
  visivel: { type: Boolean },
  imagemUrl: { type: String },
  valor: { type: Number },
  vendidos: { type: Number },
  emoji: { type: String },
  uuid: { type: String },
});

export const ItemSchema = new Schema<IItem>({
  sabores: { type: [PizzaSaborSchema] },
  tipo: { type: String, enum: ["pizza", "bebida", "outro"] },
  nome: { type: String },
  tamanho: { type: String },
  observacao: { type: String },
  imagemUrl: { type: String },
  comboId: { type: String },
  promoId: { type: String },
  valor: { type: Number, required: true },
});
