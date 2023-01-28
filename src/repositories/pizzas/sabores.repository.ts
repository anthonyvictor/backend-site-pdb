import { IPizzaGrupo, IPizzaSabor } from "../../types/pizza";

export const saboresRepository = async (
	from: "localdb" | "api",
	query?: string,
) => {
	let grupos: IPizzaGrupo[] = [];

	try {
		if (from === "localdb") {
			const getMaiorValorGrupo = (grupo: IPizzaGrupo) =>
				Math.max(
					...grupo.sabores.map(s => Math.max(...s.valores.map(v => v.valor))),
				);
			// .reduce(
			// 	(max, curr) => max + Math.max(...curr.valores.map(v => v.valor)),
			// 	0,
			// );
			const getMaiorValorSabor = (sabor: IPizzaSabor) =>
				Math.max(...sabor.valores.map(v => v.valor));

			const { db } = await import("../../config/localDatabase");
			grupos = ((await db.getData("/pizzas/sabores-grupos")) as IPizzaGrupo[])
				.sort((a, b) => (a.sabores.length > b.sabores.length ? 1 : -1))
				.sort((a, b) =>
					getMaiorValorGrupo(a) > getMaiorValorGrupo(b) ? 1 : -1,
				)
				.map(g => ({
					...g,
					sabores: g.sabores
						.sort((a, b) => (a.nome > b.nome ? 1 : -1))
						.reverse()
						.sort((a, b) =>
							getMaiorValorSabor(a) > getMaiorValorSabor(b) ? 1 : -1,
						),
				}));
		} else if (from === "api") {
			const { api } = await import("../../config/api");
			const response = await api.get(`/pizzas/sabores-grupos${query && query}`);
		}
	} catch (err) {
		console.error("Error, failed to fetch!", (err as Error).message);
	}

	return grupos;
};

export const updateSabor = async (
	sabor: IPizzaSabor,
	from: "localdb" | "api",
) => {
	if (from == "localdb") {
		const { db } = await import("../../config/localDatabase");
		const sabores = await saboresRepository("localdb");

		let novosSabores: Array<IPizzaGrupo> = [];

		if (JSON.stringify(sabores).includes(sabor.nome)) {
			novosSabores = (sabores as Array<IPizzaGrupo>).map(x => {
				x.sabores = x.sabores.map(s => (s.nome === sabor.nome ? sabor : s));
				return x;
			});
			await db.push("/pizzas/sabores-grupos", novosSabores);
			return true;
		} else {
			throw new Error("Não encontrado");
		}
	} else {
		throw new Error("Falha ao procurar dado solicitado");
	}
};

export const insertSabor = async (
	sabor: IPizzaSabor,
	grupo: string,
	from: "localdb" | "api",
) => {
	if (from == "localdb") {
		const { db } = await import("../../config/localDatabase");
		const sabores = await saboresRepository("localdb");

		let novosSabores: Array<IPizzaGrupo> = sabores;

		const saborEncontrado = sabores
			.flat()
			.find(y => y.nome.toUpperCase() === sabor.nome.toUpperCase());
		const grupoEncontrado = sabores.find(
			x => x.nome.toUpperCase() === grupo.toUpperCase(),
		);

		if (saborEncontrado) {
			throw new Error("Dado já existe");
		} else if (grupoEncontrado) {
			grupoEncontrado.sabores.push(sabor);
			novosSabores = novosSabores.map(x =>
				x.nome === grupoEncontrado.nome ? grupoEncontrado : x,
			);
		} else {
			novosSabores.push({ nome: grupo, sabores: [sabor] });
		}
		await db.push("/pizzas/sabores-grupos", novosSabores);
	} else {
		throw new Error("Falha ao procurar dado solicitado");
	}
};
