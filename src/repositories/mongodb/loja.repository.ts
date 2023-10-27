import { Repo } from "..";
import { ILojaGetDTO } from "../../dtos/loja/get";
import { LojaModel } from "../../infra/mongodb/models/loja";
import { ILoja } from "../../types/loja";

export class LojaRepoMongodb extends Repo<ILoja> {
  async find(dto: ILojaGetDTO): Promise<ILoja> {
    const data = await LojaModel.find().exec();
    let result = data?.[0]
    if(!result){
      result = await LojaModel.create({closedUntil: undefined});
    }
    
    return result
  }
  async create(item: ILoja) {}
  
  async update(id: string, { closedUntil }: ILoja) {
    const data = await LojaModel.find().exec();
    let result = data?.[0]
    if(!result){
      result = await LojaModel.create({ closedUntil });
    }else{
      await LojaModel.findByIdAndUpdate(result._id,
        { closedUntil });
        
      }
  }
  async delete(id: string) { 
    await LojaModel.updateMany(
      { closedUntil: {$exists: true, $gte: new Date() } }, 
      { $unset: { closedUntil: '' } }).exec();
    
  }
}
