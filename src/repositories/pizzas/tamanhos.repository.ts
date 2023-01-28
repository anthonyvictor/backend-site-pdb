import { IPizzaTamanho } from "../../types/pizza";

export const tamanhosRepository = async (
	from: "localdb" | "api",
	query?: string,
) => {
	let tamanhos: IPizzaTamanho[] = [];

	try {
		if (from === "localdb") {
			const { db } = await import("../../config/localDatabase");
			tamanhos = (await db.getData("/pizzas/tamanhos")) as IPizzaTamanho[];
		} else if (from === "api") {
			const { api } = await import("../../config/api");
			const response = await api.get(`/pizzas/tamanhos${query && query}`);
		}
	} catch (err) {
		console.error("Error, failed to fetch!", (err as Error).message);
	}

	return tamanhos;
};

export const updateTamanho = async (
	tamanho: IPizzaTamanho,
	from: "localdb" | "api",
) => {
	if (from == "localdb") {
		const { db } = await import("../../config/localDatabase");
		const tamanhos = await db.getData("/pizzas/tamanhos");

		let novosTamanhos: Array<IPizzaTamanho> = [];

		if (JSON.stringify(tamanhos).includes(tamanho.nome)) {
			novosTamanhos = (tamanhos as Array<IPizzaTamanho>).map(t =>
				t.nome === tamanho.nome ? tamanho : t,
			);
			await db.push("/pizzas/tamanhos", novosTamanhos);
		} else {
			throw new Error("Não encontrado");
		}
	} else {
		throw new Error("Falha ao procurar dado solicitado");
	}
};
