import { Repo } from "../..";
import { SaboresModel } from "../../../infra/mongodb/models/pizzas/sabores";
import { IPizzaSabor } from "../../../types/pizza";

export class SaboresRepoMongodb extends Repo<IPizzaSabor> {
  async find(): Promise<IPizzaSabor[]> {
    // return (await SaboresModel.find().exec()).map(x => x.toObject())
    return (await SaboresModel.find().exec()).map(x => x.toJSON())
    
  }
  async create(item: IPizzaSabor) {
    await SaboresModel.create(item)
  }
  async update(id: string, item: IPizzaSabor) {
    await SaboresModel.findByIdAndUpdate(id, item)
  }
  async delete(id: string) {
    await SaboresModel.findByIdAndDelete(id)
  }

}
