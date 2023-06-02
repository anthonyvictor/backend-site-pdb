import { Repo } from "..";
import { api } from "../../config/api";
import { IOutro } from "../../types/outro";

export class PedidosRepoMysql extends Repo<IOutro> {
  async find(): Promise<IOutro[]> {
    return (await api.get("/pedidos")).data as IOutro[];
  }
  async create(item: IOutro) {
    await api.post("/pedidos", item);
  }
  async update(id: string, item: IOutro) {
    await api.patch(`/pedidos?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/pedidos?key=id&value=${id}`);
  }
}
