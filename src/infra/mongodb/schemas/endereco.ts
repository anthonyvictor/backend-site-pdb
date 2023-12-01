import { Schema } from "mongoose";
import { IEndereco } from "../../../types/endereco";

export const EnderecoSchema = new Schema<IEndereco>({
  rua: { type: String },
  bairroId: { type: String },
  cep: { type: String },
  taxa: { type: Number },
});

