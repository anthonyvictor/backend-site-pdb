import { Schema } from "mongoose";
import { IPagamento } from "../../../types/pedido";

export const PagamentoSchema = new Schema<IPagamento>({
  tipo: {
    type: String,
    enum: ["especie", "pix", "cartao"],
    required: true,
  },
  valor: { type: Number, required: true },
  trocoPara: { type: Number, required: true },
});
