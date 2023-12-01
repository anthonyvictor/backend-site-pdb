import { Repo } from "../..";
import { TamanhosModel } from "../../../infra/mongodb/models/pizzas/tamanhos";
import { IPizzaTamanho } from "../../../types/pizza";

export class TamanhosRepoMongodb extends Repo<IPizzaTamanho> {
  async find(): Promise<IPizzaTamanho[]> {
    return (await TamanhosModel.find().exec()).map(x => x.toJSON())
  }
  async create(item: IPizzaTamanho) {
    await TamanhosModel.create(item)
  }
  async update(id: string, item: IPizzaTamanho) {
    await TamanhosModel.findByIdAndUpdate(id, item)
  }
  async delete(id: string) {
    await TamanhosModel.findByIdAndDelete(id)
  }

}
