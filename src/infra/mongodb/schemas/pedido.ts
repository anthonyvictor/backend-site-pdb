import { Schema } from "mongoose";
import { IPedido } from "../../../types/pedido";
import { ClienteSchema } from "./cliente";
import { HorarioSchema } from "./horario";
import { ItemSchema } from "./item";
import { PagamentoSchema } from "./pagamento";

export const PedidoSchema = new Schema<IPedido>({
  cliente: {
    type: ClienteSchema,
    required: true,
  },
  tipo: { type: String, enum: ["retirada", "entrega"] },
  endereco: {
    cep: { type: String },
    bairro: { type: String },
    local: { type: String },
    numero: { type: String },
    referencia: { type: String },
    taxa: { type: Number },
  },
  historico: { type: [HorarioSchema], required: true },
  itens: { type: [ItemSchema], required: true },
  posicao: { type: Number },
  previsao: { type: Date },
  pagamento: { type: [PagamentoSchema], required: true },
});

PedidoSchema.pre<IPedido>("save", function (next) {
  if (this.tipo === "entrega") {
    if (!this.endereco?.cep || !this.endereco?.bairro) {
      const error = new Error("Endereço inválido");
      return next(error);
    }
  }
  next();
});
