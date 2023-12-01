import mongoose from "mongoose";
import { PizzaTamanhoSchema } from "../../schemas/item";
import { IPizzaTamanho } from "../../../../types/pizza";

export const TamanhosModel = mongoose.model<IPizzaTamanho>("Tamanhos", PizzaTamanhoSchema);
