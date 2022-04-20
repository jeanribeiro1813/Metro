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
    
    const pmtRepository = getCustomRepository(ActividadesRepository);
    
    const checkPMTExists = await pmtRepository.findById(id);

    if (!checkPMTExists) {

      if (checkPMTExists) {
        throw new AppError('Actividades already exists.',404);
      }

    }

    const pmt = await pmtRepository.create({
      id,
      descripcion,
    });

    return pmt;
  }
}

export default CreateActividadesService;
