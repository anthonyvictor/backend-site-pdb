import { Schema } from "mongoose";
import { IHorario } from "../../../types/pedido";

export const HorarioSchema = new Schema<IHorario>({
  tipo: {
    type: String,
    enum: [
      "enviado",
      "recebido",
      "alterado",
      "aceito",
      "cancelado",
      "finalizado",
      "pronto",
    ],
    required: true,
  },
  data: { type: Date, required: true },
});
