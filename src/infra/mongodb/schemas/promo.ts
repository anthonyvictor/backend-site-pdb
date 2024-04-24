import { Schema } from "mongoose";
import { IPromo } from "../../../types/promo";

export const PromoSchema = new Schema<IPromo>({
  nome: { type: String, required: true },
  ativa: { type: Boolean, required: true },
  visivel: { type: Boolean, required: true },
  dias: {
    type: Schema.Types.Mixed,
    validate: {
      validator: function (array: (string | Date)[]) {
        return array.every(
          (el) => typeof el === "string" || el instanceof Date
        );
      },
      message: (props) => `${props.value} não é uma string ou data válida!`,
    },
    required: true,
  },
  modal: {
    imagemUrl: { type: String, required: true },
    route: { type: String, required: true },
  },
});
