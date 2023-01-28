import { IOutro } from "../types/outro";

export const lanchesRepository = async (
	from: "localdb" | "api",
	query?: string,
) => {
	let lanches: IOutro[] = [];

	try {
		if (from === "localdb") {
			const { db } = await import("../config/localDatabase");
			lanches = (await db.getData("/lanches")) as IOutro[];
		} else if (from === "api") {
			const { api } = await import("../config/api");
			const response = await api.get(`/lanches${query && query}`);
		}
	} catch (err) {
		console.error("Error, failed to fetch!", (err as Error).message);
	}

	return lanches;
};

export const updateLanche = async (lanche: IOutro, from: "localdb" | "api") => {
	if (from == "localdb") {
		const { db } = await import("../config/localDatabase");
		const lanches = await lanchesRepository("localdb");

		let novosLanches: Array<IOutro> = [];

		if (JSON.stringify(lanches).includes(lanche.nome)) {
			novosLanches = (lanches as Array<IOutro>).map(x =>
				x.nome.toUpperCase() === lanche.nome.toUpperCase() ? lanche : x,
			);
			await db.push("/lanches", novosLanches);
			return true;
		} else {
			throw new Error("Não encontrado");
		}
	} else {
		throw new Error("Falha ao procurar dado solicitado");
	}
};

export const insertLanche = async (lanche: IOutro, from: "localdb" | "api") => {
	if (from == "localdb") {
		const { db } = await import("../config/localDatabase");
		const lanches = await lanchesRepository("localdb");

		let novosLanches: Array<IOutro> = lanches;

		const lancheEncontrado = lanches.find(
			y => y.nome.toUpperCase() === lanche.nome.toUpperCase(),
		);

		if (lancheEncontrado) {
			throw new Error("Dado já existe");
		} else {
			novosLanches.push(lanche);
		}
		await db.push("/pizzas/lanches", novosLanches);
	} else {
		throw new Error("Falha ao procurar dado solicitado");
	}
};
