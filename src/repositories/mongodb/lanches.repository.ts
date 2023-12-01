import { Repo } from "../";
import { LanchesModel } from "../../infra/mongodb/models/lanches";
import { IOutro } from "../../types/outro";

export class LanchesRepoMongodb extends Repo<IOutro> {
  async find(): Promise<IOutro[]> {
    return await LanchesModel.find().exec()
  }
  async create(item: IOutro) {
    await LanchesModel.create(item)
  }
  async update(id: string, item: IOutro) {
    await LanchesModel.findByIdAndUpdate(id, item)
  }
  async delete(id: string) {
    await LanchesModel.findByIdAndDelete(id)
  }

}
