import { Repo } from "..";
import { IPedidosGetDTO } from "../../dtos/pedidos/get";
import { PedidosModel } from "../../infra/mongodb/models/pedido";

export class PedidosRepoMongodb extends Repo<IPedido> {
  async find(dto: IPedidosGetDTO): Promise<IPedido[]> {
    let data = [];
    const { id } = dto;
    if (id) {
      data = await PedidosModel.find({ _id: id }).exec();
    } else {
      data = await PedidosModel.find().exec();
    }
    const result = data.map(
      (pedido) =>
        ({
          id: pedido._id.toString(),
          cliente: pedido.cliente,
          historico: pedido.historico,
          itens: pedido.itens,
          posicao: pedido.posicao,
          previsao: pedido.previsao,
          tipo: pedido.tipo,
          endereco: pedido.endereco,
        } as IPedido)
    );

    return result;
  }
  async create(item: IPedido) {
    const pedido = await PedidosModel.create(item);

    return {
      id: pedido._id.toString(),
      cliente: pedido.cliente,
      historico: pedido.historico,
      itens: pedido.itens,
      posicao: pedido.posicao,
      previsao: pedido.previsao,
      tipo: pedido.tipo,
      endereco: pedido.endereco,
    };
  }
  async update(id: string, item: IPedido) {
    const pedido = await PedidosModel.findByIdAndUpdate(id, item, {
      new: true,
    }).exec();
    if (!pedido) throw new Error("Failed to update user");
    return {
      id: pedido._id.toString(),
      cliente: pedido.cliente,
      historico: pedido.historico,
      itens: pedido.itens,
      posicao: pedido.posicao,
      previsao: pedido.previsao,
      tipo: pedido.tipo,
      endereco: pedido.endereco,
    };
  }
  async delete(id: string) {
    await PedidosModel.findByIdAndDelete(id).exec();
  }
}
