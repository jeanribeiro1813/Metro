import {getCustomRepository} from 'typeorm'
import Actividades from '../../typeorm/entities/Actividades';
import ActividadesRepository from '../../typeorm/repositories/ActividadesRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {

  id:string,
  descripcion:string,
  
 

}

class CreateActividadesService {

  public async execute({
    id,
    descripcion,
    
  }: IRequestDTO): Promise<Actividades> {
    
    const SSOMAPMTRepository = getCustomRepository(ActividadesRepository);
    
    const checkSSOMAPMTExists = await SSOMAPMTRepository.findById(id);

    if (!checkSSOMAPMTExists) {

      if (checkSSOMAPMTExists) {
        throw new AppError('Actividades already exists.',404);
      }

    }

    const SSOMAPMT = await SSOMAPMTRepository.create({
      id,
      descripcion,
    });

    return SSOMAPMT;
  }
}

export default CreateActividadesService;
