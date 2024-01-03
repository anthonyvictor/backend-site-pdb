import { Schema } from "mongoose";
import { IBairro } from "../../../types/endereco";
import { ILog } from "../../../types/log";

export const LogSchema = new Schema<ILog>({
  error: {
    type: {
      stack: { type: String },
      message: { type: String },
    },
  },
});
