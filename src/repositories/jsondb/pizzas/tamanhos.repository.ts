import { Repo } from "../..";
import { RepoJsondb } from "../index.repository";
import { IPizzaSabor, IPizzaTamanho } from "../../../types/pizza";

export class TamanhosRepoJsondb extends Repo<IPizzaTamanho> {
  async find(): Promise<IPizzaTamanho[]> {
    const repo = await new RepoJsondb();
    const tamanhos = (await repo.get("/pizzas/tamanhos")) as IPizzaTamanho[];
    const sabores = (await repo.get("/pizzas/sabores")) as IPizzaSabor[];
    const resultado = tamanhos.map((t) => ({
      ...t,
      aPartir: sabores
        .map((s) =>
          s.valores.filter((v) => v.tamanhoId === t.id).map((v) => v.valor)
        )
        .flat()
        .sort()[0],
    }));
    return resultado;
  }
  async create(data: IPizzaTamanho) {
    await new RepoJsondb().post("/pizzas/tamanhos", { data });
  }
  async update(value: string, data: IPizzaTamanho) {
    await new RepoJsondb().patch(`/pizzas/tamanhos`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/pizzas/tamanhos`, { value });
  }
}
