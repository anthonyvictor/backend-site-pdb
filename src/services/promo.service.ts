import { IPromo } from "../types/promo";
import { Service } from ".";
import { v4 as uuidv4 } from "uuid";
import { Repo } from "../repositories";

export class PromoService extends Service<IPromo> {
  constructor(repo: Repo<IPromo>) {
    super(repo);
  }
  async find(): Promise<IPromo[]> {
    const data = ((await this.repo.find()) as IPromo[]).sort((a, b) =>
      a.nome > b.nome ? 1 : -1
    );
    return data;
  }

  async create(item: IPromo) {
    const id = uuidv4();
    await this.repo.create({ ...item, id });
  }
  async update(itemId: string, item: IPromo) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
