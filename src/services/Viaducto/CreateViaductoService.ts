import {getCustomRepository} from 'typeorm'
import Viaducto from '../../typeorm/entities/Viaducto';
import ViaductoRepository from '../../typeorm/repositories/ViaductoRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {

  id:string,
  cod:string
  descripcion:string,
  
 

}

class CreateViaductoService {

  public async execute({
    id,
    cod,
    descripcion,
    
  }: IRequestDTO): Promise<Viaducto> {
    
    const Repository = getCustomRepository(ViaductoRepository);
    
    const checkSSOMAPMTExists = await Repository.findById(id);

    if (!checkSSOMAPMTExists) {

      if (checkSSOMAPMTExists) {
        throw new AppError('Acciones already exists.',404);
      }

    }

    const SSOMAPMT = await Repository.create({

      id,
      cod,
      descripcion
      
    });

    return SSOMAPMT;
  }
}

export default CreateViaductoService;
