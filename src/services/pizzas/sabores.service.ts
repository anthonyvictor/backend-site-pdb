import { Service } from "..";
import { IPizzaGrupo, IPizzaSabor } from "../../types/pizza";
import { v4 as uuidv4 } from "uuid";
import { Repo } from "../../repositories";
import {
  sortFlavoursByMidValue,
  sortFlavoursByName,
  sortGroupsByFlavoursLength,
  sortGroupsByMidValue,
} from "../../util/services/sabores.util";
import { ISaboresGetDTO } from "../../dtos/sabores/get";
export class SaboresService extends Service<IPizzaSabor> {
  constructor(repo: Repo<IPizzaSabor>, private GruposRepo: Repo<IPizzaGrupo>) {
    super(repo);
  }

  async find({ id }: ISaboresGetDTO) {
    const sabores = ((await this.repo.find()) as IPizzaSabor[]).filter((e) =>
      id ? e.id === id : true
    );
    const grupos = (await this.GruposRepo.find()) as IPizzaGrupo[];

    return grupos
      .map((g) => ({
        ...g,
        sabores: sabores
          .filter((s) => s.grupoId === g.id)
          .sort(sortFlavoursByName)
          .sort(sortFlavoursByMidValue),
      }))
      .sort(sortGroupsByFlavoursLength)
      .sort(sortGroupsByMidValue)
      .filter((g) => g.sabores.length > 0);
  }
  async create(item: IPizzaSabor) {
    const id = uuidv4();
    await this.repo.create({ ...item, id });
  }
  async update(itemId: string, item: IPizzaSabor) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
