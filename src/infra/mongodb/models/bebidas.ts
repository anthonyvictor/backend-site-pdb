import mongoose from "mongoose";
import { IOutro } from "../../../types/outro";
import { OutroSchema } from "../schemas/item";

export const BebidasModel = mongoose.model<IOutro>("Bebidas", OutroSchema);
