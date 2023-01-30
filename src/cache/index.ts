import { api } from "../config/api";
import { IEndereco } from "../types/endereco";
import { IOutro } from "../types/outro";
import { IPizzaGrupo, IPizzaTamanho } from "../types/pizza";

export class Cache {
	constructor() {
		this.updateCache();
	}

	lanches: IOutro[] = [];
	bebidas: IOutro[] = [];
	enderecos: IEndereco[] = [];
	tamanhos: IPizzaTamanho[] = [];
	grupos: IPizzaGrupo[] = [];

	async updateCache() {
		this.lanches = (await (await api.get("/lanches")).data) as IOutro[];
		this.bebidas = (await (await api.get("/bebidas")).data) as IOutro[];
		this.enderecos = (await (await api.get("/enderecos")).data) as IEndereco[];
		this.tamanhos = (await (
			await api.get("/pizzas/tamanhos")
		).data) as IPizzaTamanho[];
		this.grupos = (await (
			await api.get("/pizzas/sabores-grupos")
		).data) as IPizzaGrupo[];
	}
}
