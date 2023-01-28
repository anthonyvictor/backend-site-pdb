import { IOutro } from "../types/outro";

export const bebidasRepository = async (
	from: "localdb" | "api",
	query?: string,
) => {
	let bebidas: IOutro[] = [];

	try {
		if (from === "localdb") {
			const { db } = await import("../config/localDatabase");
			bebidas = (await db.getData("/bebidas")) as IOutro[];
		} else if (from === "api") {
			const { api } = await import("../config/api");
			const response = await api.get(`/bebidas${query && query}`);
		}
	} catch (err) {
		console.error("Error, failed to fetch!", (err as Error).message);
	}

	return bebidas;
};

export const updateBebida = async (bebida: IOutro, from: "localdb" | "api") => {
	if (from == "localdb") {
		const { db } = await import("../config/localDatabase");
		const bebidas = await bebidasRepository("localdb");

		let novosBebidas: Array<IOutro> = [];

		novosBebidas = (bebidas as Array<IOutro>).map(x =>
			x.nome.toUpperCase() === bebida.nome.toUpperCase() ? bebida : x,
		);
		await db.push("/bebidas", novosBebidas);
	} else {
		throw new Error("Falha ao procurar dado solicitado");
	}
};

export const insertBebida = async (bebida: IOutro, from: "localdb" | "api") => {
	if (from == "localdb") {
		const { db } = await import("../config/localDatabase");
		const bebidas = await bebidasRepository("localdb");

		let novosBebidas: Array<IOutro> = bebidas;

		const bebidaEncontrado = bebidas.find(
			y => y.nome.toUpperCase() === bebida.nome.toUpperCase(),
		);

		if (bebidaEncontrado) {
			throw new Error("Dado já existe");
		} else {
			novosBebidas.push(bebida);
		}
		await db.push("/pizzas/bebidas", novosBebidas);
	} else {
		throw new Error("Falha ao procurar dado solicitado");
	}
};
