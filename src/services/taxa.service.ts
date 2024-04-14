import { IEndereco } from "../types/endereco";
import { clearAddress } from "../util/format";
import { Service } from ".";
import { ITaxaGetDTO } from "../dtos/taxa/get";
import { Repo } from "../repositories";

export class TaxaService extends Service<IEndereco | null> {
  constructor(protected repo: Repo<IEndereco>) {
    super(repo);
  }
  create(item: IEndereco): void {
    throw new Error("Method not implemented.");
  }
  update(itemId: string, item: IEndereco): void {
    throw new Error("Method not implemented.");
  }
  delete(itemId: string): void {
    throw new Error("Method not implemented.");
  }
  async find(dto?: ITaxaGetDTO): Promise<IEndereco | null> {
    const { rua, cep, bairroId } = dto as ITaxaGetDTO;

    if (!rua && !cep && !bairroId) throw new Error("invalid address");

    let addressResponse: IEndereco | undefined;

    const cleanedCep = String(cep).replace(/[^0-9]/, "");

    const allAddresses = (await this.repo.find()) as IEndereco[];

    if (!!cleanedCep) {
      addressResponse = allAddresses.find((x) => {
        return x.cep === cleanedCep;
      });
    } else {
      const cleanedAddress = clearAddress(rua ?? "");

      const filteredAddresses = allAddresses
        .sort((a, b) => (a.taxa > b.taxa ? 1 : a.taxa < b.taxa ? -1 : 0))
        // .reverse()
        .filter((x) =>
          x.rua.replace(/ DO | DA | DE | DI /g, " ").includes(cleanedAddress)
        );

      if (
        filteredAddresses.length === 1 &&
        ["656a215c81f555282589ebb2", "656a215c81f555282589ebb3"].some(
          (x) => filteredAddresses[0].bairroId === x
        ) &&
        ["656a215c81f555282589ebb2", "656a215c81f555282589ebb3"].some(
          (x) => bairroId === x
        )
      ) {
        return filteredAddresses[0];
      }
      console.log("filteredAddresses", filteredAddresses);
      const addressesInNeighbourhood = allAddresses.filter(
        (x) => x.bairroId === bairroId
      );

      const neighbourhoodMidFee = Number(
        (
          addressesInNeighbourhood.reduce(
            (acc, address) => acc + address.taxa,
            0
          ) / addressesInNeighbourhood.length
        ).toFixed(2)
      );

      console.log("neighbourhoodMidFee", neighbourhoodMidFee);

      const neighbourhoodMaxFee = Number(
        Math.max(...addressesInNeighbourhood.map((x) => x.taxa))
      );

      console.log("neighbourhoodMaxFee", neighbourhoodMaxFee);
      const filteredAddressWithNeighbourhood = filteredAddresses.find(
        (e) => e.bairroId === bairroId
      );
      console.log(
        "filteredAddressWithNeighbourhood",
        filteredAddressWithNeighbourhood
      );

      const sortAddressesByFee = (a: IEndereco, b: IEndereco) =>
        a.taxa > b.taxa ? 1 : a.taxa < b.taxa ? -1 : 0;

      const nextAddress = addressesInNeighbourhood
        .filter((e) => e.taxa >= neighbourhoodMidFee)
        .sort(sortAddressesByFee)?.[0];

      const previousAddress = addressesInNeighbourhood
        .filter((e) => e.taxa < neighbourhoodMidFee)
        .sort(sortAddressesByFee)
        .reverse()?.[0];

      const isNextAddressClosest = () =>
        (nextAddress?.taxa || 0) - neighbourhoodMidFee <
        neighbourhoodMidFee - (previousAddress?.taxa || 0);

      const closestAddress = isNextAddressClosest()
        ? nextAddress
        : previousAddress;

      const exactlyAddress = filteredAddresses?.[0];

      // console.log("endereco limpo", cleanedAddress);
      // console.log("filtrados", filteredAddresses);
      // console.log("taxa media do bairro", neighbourhoodMidFee);
      // console.log("taxa máxima do bairro", neighbourhoodMaxFee);
      // console.log("taxa pelo bairro", filteredAddressWithNeighbourhood);
      // console.log("taxa ao redor do bairro UP", nextAddress);
      // console.log("taxa ao redor do bairro DOWN", previousAddress);
      // console.log("taxa ao redor do bairro", closestAddress);
      // console.log("taxa correta", exactlyAddress);

      addressResponse =
        filteredAddressWithNeighbourhood?.taxa ?? 0 > 0
          ? filteredAddressWithNeighbourhood
          : exactlyAddress?.taxa ?? 0 > neighbourhoodMaxFee
          ? closestAddress
          : exactlyAddress;
    }

    // console.log("resposta:", addressResponse);

    console.log("resposta:", addressResponse);
    return addressResponse ?? null;
  }
}
