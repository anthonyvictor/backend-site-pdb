import mongoose from "mongoose";
import { ILog } from "../../../types/log";
import { LogSchema } from "../schemas/log";

export const LogsModel = mongoose.model<ILog>("Logs", LogSchema);
