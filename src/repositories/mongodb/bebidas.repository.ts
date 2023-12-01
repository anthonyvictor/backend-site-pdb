import { Repo } from "../";
import { BebidasModel } from "../../infra/mongodb/models/bebidas";
import { IOutro } from "../../types/outro";

export class BebidasRepoMongodb extends Repo<IOutro> {
  async find(): Promise<IOutro[]> {
    return await BebidasModel.find().exec()
  }
  async create(item: IOutro) {
    await BebidasModel.create(item)
  }
  async update(id: string, item: IOutro) {
    await BebidasModel.findByIdAndUpdate(id, item)
  }
  async delete(id: string) {
    await BebidasModel.findByIdAndDelete(id)
  }

}
