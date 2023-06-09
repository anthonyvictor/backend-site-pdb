import { Service } from "..";
import { v4 as uuidv4 } from "uuid";
import { ITamanhosGetDTO } from "../../dtos/tamanhos/get";
import { IPizzaTamanho } from "../../types/pizza";

export class TamanhosService extends Service<IPizzaTamanho> {
  async find({ id }: ITamanhosGetDTO): Promise<IPizzaTamanho[]> {
    const data = ((await this.repo.find()) as IPizzaTamanho[])
      .filter((e) => (id ? e.id === id : true))
      .sort((a, b) => (a.tamanhoAprox > b.tamanhoAprox ? 1 : -1));
    return data;
  }

  async create(item: IPizzaTamanho) {
    const id = uuidv4();
    await this.repo.create({ ...item, id });
  }
  async update(itemId: string, item: IPizzaTamanho) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
