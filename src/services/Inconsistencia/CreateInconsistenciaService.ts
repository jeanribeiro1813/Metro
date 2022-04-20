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
    
    const checkPMTExists = await inconsistenciaRepository.findById(id);

    if (!checkPMTExists) {

      if (checkPMTExists) {
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
