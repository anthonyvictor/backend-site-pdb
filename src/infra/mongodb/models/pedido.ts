import mongoose from "mongoose";
import { IPedido } from "../../../types/pedido";
import { PedidoSchema } from "../schemas/pedido";

export const PedidosModel = mongoose.model<IPedido>("Pedidos", PedidoSchema);
