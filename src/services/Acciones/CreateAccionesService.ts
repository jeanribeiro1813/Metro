import {getCustomRepository} from 'typeorm'
import Acciones from '../../typeorm/entities/Acciones';
import AccionesRepository from '../../typeorm/repositories/AccionesRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {

  id:string,
  descripcion:string,
  
 

}

class CreateAccionesService {

  public async execute({
    id,
    descripcion,
    
  }: IRequestDTO): Promise<Acciones> {
    
    const SSOMAPMTRepository = getCustomRepository(AccionesRepository);
    
    const checkSSOMAPMTExists = await SSOMAPMTRepository.findById(id);

    if (!checkSSOMAPMTExists) {

      if (checkSSOMAPMTExists) {
        throw new AppError('Acciones already exists.',404);
      }

    }

    const SSOMAPMT = await SSOMAPMTRepository.create({
      id,
      descripcion,
    });

    return SSOMAPMT;
  }
}

export default CreateAccionesService;
