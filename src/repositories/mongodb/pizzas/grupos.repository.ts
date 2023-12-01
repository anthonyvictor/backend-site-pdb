import { Repo } from "../..";
import { GruposModel } from "../../../infra/mongodb/models/pizzas/grupos";
import { IPizzaGrupo } from "../../../types/pizza";

export class GruposRepoMongodb extends Repo<IPizzaGrupo> {
  async find(): Promise<IPizzaGrupo[]> {
    return (await GruposModel.find().exec()).map(x => x.toJSON())
  }
  async create(item: IPizzaGrupo) {
    await GruposModel.create(item)
  }
  async update(id: string, item: IPizzaGrupo) {
    await GruposModel.findByIdAndUpdate(id, item)
  }
  async delete(id: string) {
    await GruposModel.findByIdAndDelete(id)
  }

}
