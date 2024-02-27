import { Repo } from "..";
import { api } from "../../config/api";
import { IPromo } from "../../types/promo";

export class PromoRepoApi extends Repo<IPromo> {
  async find(): Promise<IPromo[]> {
    return (await api.get("/promo")).data as IPromo[];
  }
  async create(item: IPromo) {
    await api.post("/promo", item);
  }
  async update(id: string, item: IPromo) {
    await api.patch(`/promo?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/promo?key=id&value=${id}`);
  }
}
