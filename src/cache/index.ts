import { api } from "../config/api";
import { IEndereco } from "../types/endereco";
import { IOutro } from "../types/outro";
import { IPizzaGrupo, IPizzaTamanho } from "../types/pizza";

export class Cache {
	constructor() {
		// this.updateCache();
	}

	lanches: IOutro[] = [];
	bebidas: IOutro[] = [];
	enderecos: IEndereco[] = [];
	tamanhos: IPizzaTamanho[] = [];
	grupos: IPizzaGrupo[] = [];

	async updateCache(
		which?: "lanches" | "bebidas" | "enderecos" | "tamanhos" | "grupos",
	) {
		if (!which || which === "lanches")
			this.lanches = (await (await api.get("/lanches")).data) as IOutro[];

		if (!which || which === "bebidas")
			this.bebidas = (await (await api.get("/bebidas")).data) as IOutro[];

		if (!which || which === "enderecos")
			this.enderecos = (await (
				await api.get("/enderecos")
			).data) as IEndereco[];

		if (!which || which === "tamanhos")
			this.tamanhos = (await (
				await api.get("/pizzas/tamanhos")
			).data) as IPizzaTamanho[];

		if (!which || which === "grupos")
			this.grupos = (await (
				await api.get("/pizzas/grupos")
			).data) as IPizzaGrupo[];
	}
}
