import mongoose from "mongoose";
import { PizzaGrupoSchema } from "../../schemas/item";
import { IPizzaGrupo } from "../../../../types/pizza";

export const GruposModel = mongoose.model<IPizzaGrupo>("Grupos", PizzaGrupoSchema);
