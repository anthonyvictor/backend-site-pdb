import { IEndereco } from "../types/endereco";
import { clearAddress } from "../util/format";
import { Service } from ".";
import { ITaxaGetDTO } from "../dtos/taxa/get";
import { Repo } from "../repositories";

export class TaxaService extends Service<number> {
	constructor(
		protected repo: Repo<number>,
		protected EnderecosRepo: Repo<IEndereco>,
	) {
		super(repo);
	}
	create(item: number): void {
		throw new Error("Method not implemented.");
	}
	update(itemId: string, item: number): void {
		throw new Error("Method not implemented.");
	}
	delete(itemId: string): void {
		throw new Error("Method not implemented.");
	}
	async find(dto?: ITaxaGetDTO): Promise<number> {
		const { street, number, cep, place, reference, neighbourhood } =
			dto as ITaxaGetDTO;

		if (!street && !cep && !place && !number && !neighbourhood && !reference)
			throw new Error("invalid address");

		let taxa: number | undefined = 0;

		const cleanedCep = String(cep).replace(/[^0-9]/, "");

		const addresses = (await this.EnderecosRepo.find()) as IEndereco[];

		if (Number(cleanedCep)) {
			taxa = addresses.find(x => {
				return x.cep === cleanedCep;
			})?.taxa;
		} else {
			const cleanedAddress = clearAddress(street ?? "");

			const filteredAddresses = addresses
				.sort((a, b) => (a.taxa > b.taxa ? 1 : a.taxa < b.taxa ? -1 : 0))
				.reverse()
				.filter(x =>
					x.rua.replace(/ DO | DA | DE | DI /g, " ").includes(cleanedAddress),
				);

			const addressInNeighbourhood = addresses.filter(
				x => x.bairroId === neighbourhood?.toString(),
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
					e => e.bairroId === neighbourhood?.toString(),
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

		return taxa ?? 0;
	}
}
