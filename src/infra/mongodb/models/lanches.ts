import mongoose from "mongoose";
import { IOutro } from "../../../types/outro";
import { OutroSchema } from "../schemas/item";

export const LanchesModel = mongoose.model<IOutro>("Lanches", OutroSchema);
