import { Repo } from "..";
import { RepoJsondb } from "./index.repository";
import { IHorario } from "../../types/horario";

export class HorariosRepoJsondb extends Repo<IHorario> {
  async find(): Promise<IHorario[]> {
    return (await new RepoJsondb().get("/horarios")) as IHorario[];
  }
  async create(data: IHorario) {
    await new RepoJsondb().post("/horarios", { data });
  }
  async update(value: string, data: IHorario) {
    await new RepoJsondb().patch(`/horarios`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/horarios`, { value });
  }
}
