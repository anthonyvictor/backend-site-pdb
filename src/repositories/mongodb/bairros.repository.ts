import { Repo } from "../";
import { BairrosModel } from "../../infra/mongodb/models/bairros";
import { IBairro } from "../../types/endereco";

export class BairrosRepoMongodb extends Repo<IBairro> {
  async find(): Promise<IBairro[]> {
    return await BairrosModel.find().exec()
  }
  async create(item: IBairro) {
    await BairrosModel.create(item)
  }
  async update(id: string, item: IBairro) {
    await BairrosModel.findByIdAndUpdate(id, item)
  }
  async delete(id: string) {
    await BairrosModel.findByIdAndDelete(id)
  }

}
