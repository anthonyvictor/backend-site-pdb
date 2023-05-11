import { Repo } from "..";
import { api } from "../../config/api";
import { IHorario } from "../../types/horario";

export class HorariosRepoApi extends Repo<IHorario> {
  async find(): Promise<IHorario[]> {
    return (await api.get("/horarios")).data as IHorario[];
  }
  async create(item: IHorario) {
    await api.post("/horarios", item);
  }
  async update(id: string, item: IHorario) {
    await api.patch(`/horarios?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/horarios?key=id&value=${id}`);
  }
}
