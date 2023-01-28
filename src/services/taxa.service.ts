import { Request, Response } from "express";
import { bairrosRepository } from "../repositories/bairros.repository";
import { enderecosRepository } from "../repositories/enderecos.repository";
import { IEndereco } from "../types/endereco";
import { clearAddress } from "../util/format";

interface ITaxaRouteGetRequest {
	street?: string;
	number?: number;
	cep?: string;
	place?: string;
	reference?: string;
	neighbourhood?: number;
}

export const getTaxa = async (req: Request, res: Response) => {
	try {
		const { street, number, cep, place, reference, neighbourhood } =
			req.query as ITaxaRouteGetRequest;

		if (!street && !cep && !place && !number && !neighbourhood && !reference)
			throw new Error("invalid address");

		let taxa: number | undefined = 0;

		const cleanedCep = String(cep).replace(/[^0-9]/, "");

		if (Number(cleanedCep)) {
			taxa = (await enderecosRepository("localdb")).find(
				(x: IEndereco) => x.cep === cleanedCep,
			)?.taxa;
		} else {
			const cleanedAddress = clearAddress(street ?? "");

			const addresses = await enderecosRepository("localdb");

			const filteredAddresses = addresses
				.sort((a, b) => (a.taxa > b.taxa ? 1 : a.taxa < b.taxa ? -1 : 0))
				.reverse()
				.filter(x =>
					x.rua.replace(/ DO | DA | DE | DI /g, " ").includes(cleanedAddress),
				);

			// RECEBE AS TAXAS MAIS PRÓXIMAS AO ENDEREÇO SOLICITADO
			const addressInNeighbourhood = addresses.filter(
				x => x.bairro.id.toString() === neighbourhood?.toString(),
			);

			const neighbourhoodMidFee = Number(
				(
					addressInNeighbourhood.reduce(
						(acc, address) => acc + address.taxa,
						0,
					) / addressInNeighbourhood.length
				).toFixed(2),
			);

			const neighbourhoodMaxFee = Number(
				Math.max(...addressInNeighbourhood.map(x => x.taxa)),
			);

			const feeByNeighbourhood =
				filteredAddresses.filter(
					e => e.bairro.id.toString() === neighbourhood?.toString(),
				)?.[0]?.taxa ?? 0;

			const feeByNearNeighbourhoodUp =
				addresses
					.filter(e => e.taxa >= neighbourhoodMidFee)
					.sort((a, b) => (a.taxa > b.taxa ? 1 : a.taxa < b.taxa ? -1 : 0))?.[0]
					?.taxa ?? 0;

			const feeByNearNeighbourhoodDown =
				addresses
					.filter(e => e.taxa < neighbourhoodMidFee)
					.sort((a, b) => (a.taxa > b.taxa ? 1 : a.taxa < b.taxa ? -1 : 0))
					.reverse()?.[0]?.taxa ?? 0;

			const feeByNearNeighbourhood =
				feeByNearNeighbourhoodUp - neighbourhoodMidFee <
				neighbourhoodMidFee - feeByNearNeighbourhoodDown
					? feeByNearNeighbourhoodUp
					: feeByNearNeighbourhoodDown;

			const fee = filteredAddresses?.[0]?.taxa ?? 0;

			taxa =
				feeByNeighbourhood === 0 && fee > neighbourhoodMaxFee
					? feeByNearNeighbourhood
					: feeByNeighbourhood > 0
					? feeByNeighbourhood
					: fee;
		}

		res.json({ taxa: taxa ?? 0 });
	} catch (e: any) {
		console.error(e["message"]);
		res.send({ taxa: 0 });
	}
};
