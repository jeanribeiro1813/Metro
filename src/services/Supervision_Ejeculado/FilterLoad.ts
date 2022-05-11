import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Supervision_Avanco  from '../../typeorm/entities/Supervision_Ejecutado';
import SupervisionAvancoRepository  from '../../typeorm/repositories/SupervisionEjeculadoRepository';



interface IResponseDTO {

    descripcion:string  ;
  
}





class FilterService{
    public async filter ({descripcion}:IResponseDTO): Promise<Supervision_Avanco[] | AppError> {
        
        const Repository = getCustomRepository(SupervisionAvancoRepository);

        const result = await Repository.createQueryBuilder().select()
        .where('descripcion ILIKE :descripcion ', {descripcion: `%${descripcion}%`}).getMany();

        if(!result){
            throw new AppError ('Não Existe',405);
          }

        return result ;
    }
}

export default FilterService;
