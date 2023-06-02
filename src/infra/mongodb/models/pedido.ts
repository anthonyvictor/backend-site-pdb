import mongoose from "mongoose";
import { PedidoSchema } from "../schemas/pedido";

export const PedidosModel = mongoose.model<IPedido>("Pedidos", PedidoSchema);
