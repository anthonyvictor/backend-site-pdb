import { Schema } from "mongoose";
import { IBairro } from "../../../types/endereco";

export const BairroSchema = new Schema<IBairro>({
  nome: { type: String },
});

