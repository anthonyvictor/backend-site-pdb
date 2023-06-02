import { Schema } from "mongoose";

export const ClienteSchema = new Schema<ICliente>({
  nome: { type: String, required: true },
  whatsapp: { type: String, required: true },
});
