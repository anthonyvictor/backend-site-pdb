import mongoose from "mongoose";
import { IBairro } from "../../../types/endereco";
import { BairroSchema } from "../schemas/bairro";

export const BairrosModel = mongoose.model<IBairro>("Bairros", BairroSchema);
