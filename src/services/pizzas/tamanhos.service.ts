import { Service } from "..";
import { v4 as uuidv4 } from "uuid";
import { ITamanhosGetDTO } from "../../dtos/tamanhos/get";
import { IPizzaSabor, IPizzaTamanho } from "../../types/pizza";
import { Repo } from "../../repositories";

export class TamanhosService extends Service<IPizzaTamanho> {
  constructor(
    repo: Repo<IPizzaTamanho>,
    private SaboresRepo: Repo<IPizzaSabor>
  ) {
    super(repo);
  }

  async find({ id }: ITamanhosGetDTO): Promise<IPizzaTamanho[]> {
    const data = ((await this.repo.find()) as IPizzaTamanho[])
      .filter((e) => (id ? e.id === id : true))
      .sort((a, b) => (a.tamanhoAprox > b.tamanhoAprox ? 1 : -1));

    const valores = ((await this.SaboresRepo.find()) as IPizzaSabor[])
      .map((x) => x.valores)
      .flat();

      console.log(data)
    return data.map((t) => ({
      ...t,
      valorMin: valores
        .filter((v) => v.tamanhoId === t.id)
        .sort((a, b) => (a.valor > b.valor ? 1 : -1))[0].valor,
    }));

    // s.valores
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
