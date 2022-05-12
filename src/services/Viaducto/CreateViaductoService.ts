import {getCustomRepository} from 'typeorm'
import Viaducto from '../../typeorm/entities/Viaducto';
import ViaductoRepository from '../../typeorm/repositories/ViaductoRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {

  id:string,
  codigo:string
  descripcion:string,
  
 

}

class CreateViaductoService {

  public async execute({
    id,
    codigo,
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
      codigo,
      descripcion
      
    });

    return SSOMAPMT;
  }
}

export default CreateViaductoService;
