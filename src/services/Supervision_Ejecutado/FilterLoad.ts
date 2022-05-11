import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Supervision_Avanco  from '../../typeorm/entities/Supervision_Ejecutado';
import SupervisionAvancoRepository  from '../../typeorm/repositories/SupervisionEjecutadoRepository';



interface IResponseDTO {

    actividad:string  ;
  
}





class FilterService{
    public async filter ({actividad}:IResponseDTO): Promise<Supervision_Avanco[] | AppError> {
        
        const Repository = getCustomRepository(SupervisionAvancoRepository);

        const result = await Repository.createQueryBuilder().select()
        .where('actividad ILIKE :actividad ', {actividad: `%${actividad}%`}).getMany();

        if(!result){
            throw new AppError ('Não Existe',405);
          }

        return result ;
    }
}

export default FilterService;
