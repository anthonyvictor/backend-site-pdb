import { Repo } from "..";
import { PromoModel } from "../../infra/mongodb/models/promo";
import { IPromo } from "../../types/promo";

export class PromoRepoMongodb extends Repo<IPromo> {
  async find(): Promise<IPromo[]> {
    return await PromoModel.find().exec();
  }
  async create(item: IPromo) {
    await PromoModel.create(item);
  }
  async update(id: string, item: IPromo) {
    await PromoModel.findByIdAndUpdate(id, item);
  }
  async delete(id: string) {
    await PromoModel.findByIdAndDelete(id);
  }
}
