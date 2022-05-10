import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Supervision_Avanco  from '../../typeorm/entities/Supervision_Avanco';
import SupervisionAvancoRepository  from '../../typeorm/repositories/SupervisionAvancoRepository';



interface IResponseDTO {

    avanco:string  ;
  
}





class FilterService{
    public async filter ({avanco}:IResponseDTO): Promise<Supervision_Avanco[] | AppError> {
        
        const Repository = getCustomRepository(SupervisionAvancoRepository);

        const result = await Repository.createQueryBuilder().select()
        .where('avanco ILIKE :avanco ', {avanco: `%${avanco}%`}).getMany();

        if(!result){
            throw new AppError ('Não Existe',405);
          }

        return result ;
    }
}

export default FilterService;
