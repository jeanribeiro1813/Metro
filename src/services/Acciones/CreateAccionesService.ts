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
    
    const pmtRepository = getCustomRepository(AccionesRepository);
    
    const checkPMTExists = await pmtRepository.findById(id);

    if (!checkPMTExists) {

      if (checkPMTExists) {
        throw new AppError('Acciones already exists.',404);
      }

    }

    const pmt = await pmtRepository.create({
      id,
      descripcion,
    });

    return pmt;
  }
}

export default CreateAccionesService;
