import { Repo } from "../";
import { EnderecosModel } from "../../infra/mongodb/models/enderecos";
import { IEndereco } from "../../types/endereco";

export class EnderecosRepoMongodb extends Repo<IEndereco> {
  async find(): Promise<IEndereco[]> {
    return await EnderecosModel.find().exec()
  }
  async create(item: IEndereco) {
    await EnderecosModel.create(item)
  }
  async update(id: string, item: IEndereco) {
    await EnderecosModel.findByIdAndUpdate(id, item)
  }
  async delete(id: string) {
    await EnderecosModel.findByIdAndDelete(id)
  }

}
