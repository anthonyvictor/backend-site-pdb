import { IOutro } from "../types/outro";
import { Service } from ".";
import { v4 as uuidv4 } from "uuid";
import { Repo } from "../repositories";

export class BebidasService extends Service<IOutro> {
  constructor(repo: Repo<IOutro>) {
    super(repo);
  }

  sortBySize = (a: IOutro, b: IOutro) => {
    let i = 0;

    if (a.nome.toLocaleLowerCase().includes("350ml")) i = -1;
    if (b.nome.toLocaleLowerCase().includes("350ml")) i = 1;
    if (a.nome.toLocaleLowerCase().includes("1l")) i = -1;
    if (b.nome.toLocaleLowerCase().includes("1l")) i = 1;

    return i;
  };

  sortByType = (a: IOutro, b: IOutro) => {
    let i = 0;

    if (a.nome.toLocaleLowerCase().includes("cerveja")) i = -1;
    if (b.nome.toLocaleLowerCase().includes("cerveja")) i = 1;
    if (a.nome.toLocaleLowerCase().includes("refrigerante")) i = -1;
    if (b.nome.toLocaleLowerCase().includes("refrigerante")) i = 1;

    return i;
  };

  async find(): Promise<IOutro[]> {
    const data = ((await this.repo.find()) as IOutro[]).sort((a, b) =>
      a.vendidos > b.vendidos ? -1 : 1
    );
    // .sort((a, b) => (a.nome > b.nome ? 1 : -1))
    // .sort(this.sortByType)
    // .sort(this.sortBySize);
    return data;
  }

  async create(item: IOutro) {
    const id = uuidv4();
    await this.repo.create({ ...item, id });
  }
  async update(itemId: string, item: IOutro) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
