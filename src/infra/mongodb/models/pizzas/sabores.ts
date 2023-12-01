import mongoose from "mongoose";
import { PizzaSaborSchema } from "../../schemas/item";
import { IPizzaSabor } from "../../../../types/pizza";

export const SaboresModel = mongoose.model<IPizzaSabor>("Sabores", PizzaSaborSchema);
