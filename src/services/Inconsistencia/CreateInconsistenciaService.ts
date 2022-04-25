import {getCustomRepository} from 'typeorm'
import Inconsistencia from '../../typeorm/entities/Inconsistencia';
import InconsistenciaRepository from '../../typeorm/repositories/InconsistenciaRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {

  id:string,
  descripcion:string,
  
 

}

class CreateInconsistenciaService {

  public async execute({
    id,
    descripcion,
    
  }: IRequestDTO): Promise<Inconsistencia> {
    
    const inconsistenciaRepository = getCustomRepository(InconsistenciaRepository);
    
    const checkSSOMAPMTExists = await inconsistenciaRepository.findById(id);

    if (!checkSSOMAPMTExists) {

      if (checkSSOMAPMTExists) {
        throw new AppError('Actividades already exists.',404);
      }

    }

    const inconsistencia = await inconsistenciaRepository.create({
      id,
      descripcion,
    });

    return inconsistencia;
  }
}

export default CreateInconsistenciaService;
