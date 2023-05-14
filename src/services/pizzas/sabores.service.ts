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

  async find({
    id,
    somenteSabores,
    gruposProcurados,
    promocionais,
    index,
    length,
  }: ISaboresGetDTO) {
    const sabores = ((await this.repo.find()) as IPizzaSabor[]).filter((e) =>
      id ? e.id === id : true
    );

    const _saboresOrdenados = sabores.sort(sortFlavoursByName);
    //
    //

    const saboresOrdenados = !!promocionais
      ? _saboresOrdenados
          .filter((x) =>
            `calabresa
            frango
            presunto
            delicia da bahia
            moda da casa
            da roça
            milho
            mussarela
            2 queijos
            3 queijos
            alho e óleo
            baiana
            napolitana
            brasileira
            romeu e julieta
            banana nevada`
              .split(
                `
      `
              )
              .filter(Boolean)
              .some((y) => x.nome.toLowerCase().includes(y))
          )
          .map((x) => ({
            ...x,
            ingredientes: x.ingredientes.filter((x) =>
              "azeitona".split(",").some((z) => !x.toLowerCase().includes(z))
            ),
          }))
      : _saboresOrdenados;
    if (somenteSabores) {
      if (length && index !== undefined) {
        return saboresOrdenados.slice(index, index + length);
      } else {
        return sabores;
      }
    }

    let grupos = (await this.GruposRepo.find()) as IPizzaGrupo[];

    const gruposPelaQuery = () =>
      grupos.filter((g) =>
        gruposProcurados
          ?.toUpperCase()
          .split(" ")
          .includes(g.nome.split(" ").slice(0, -1).join("").toUpperCase())
      );

    if (gruposProcurados) grupos = gruposPelaQuery();

    const r = grupos
      .map((g) => ({
        ...g,
        sabores: saboresOrdenados
          .sort(sortFlavoursByMidValue)
          .filter((s) => s.grupoId === g.id),
      }))
      .sort(sortGroupsByFlavoursLength)
      .sort(sortGroupsByMidValue)
      .filter((g) => g.sabores.length > 0);

    return r;
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
