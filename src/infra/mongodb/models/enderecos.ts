import mongoose from "mongoose";
import { IEndereco } from "../../../types/endereco";
import { EnderecoSchema } from "../schemas/endereco";

export const EnderecosModel = mongoose.model<IEndereco>("Enderecos", EnderecoSchema);
