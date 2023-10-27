import { Service } from ".";
import { Repo } from "../repositories";
import { min } from "date-fns";
import { IPedidosGetDTO } from "../dtos/pedidos/get";
import { z } from "zod";
import { IPedido } from "../types/pedido";
import { ILoja } from "../types/loja";
const createLojaSchema = z.object({
  closedUntil: z.date().min(new Date(), 'Data inválida').optional() 
});
export class LojaService extends Service<ILoja> {
  constructor(repo: Repo<ILoja>) {
    super(repo);
  }

  sortByRecents = (a: IPedido, b: IPedido) => {
    let i = 0;

    const dataInicialA = min(
      a.historico.filter((x) => x.tipo === "enviado").map((x) => x.data)
    );
    const dataInicialB = min(
      b.historico.filter((x) => x.tipo === "enviado").map((x) => x.data)
    );

    return dataInicialA > dataInicialB ? -1 : 1;
  };

  async find(dto: IPedidosGetDTO): Promise<ILoja> {
    const data = (await this.repo.find(dto)) as ILoja
    return data;
  }

  async create(item: ILoja) {
    createLojaSchema.parse(item);
    return await this.repo.create({ ...item });
  }
  async update(itemId: string, item: ILoja) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
