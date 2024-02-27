import { Repo } from "..";
import { RepoJsondb } from "./index.repository";
import { IPromo } from "../../types/promo";

export class PromoRepoJsondb extends Repo<IPromo> {
  async find(): Promise<IPromo[]> {
    return (await new RepoJsondb().get("/promo")) as IPromo[];
  }
  async create(data: IPromo) {
    await new RepoJsondb().post("/promo", { data });
  }
  async update(value: string, data: IPromo) {
    await new RepoJsondb().patch(`/promo`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/promo`, { value });
  }
}
