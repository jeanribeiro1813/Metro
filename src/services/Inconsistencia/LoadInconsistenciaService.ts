import { getCustomRepository, getRepository } from 'typeorm';

import Inconsistencia from '../../typeorm/entities/Inconsistencia'
import InconsistenciaRepository from '../../typeorm/repositories/InconsistenciaRepository'



class LoadInconsistenciaService{

    public async execute (): Promise< Inconsistencia[] | undefined> {
        
        const inconsistenciaRepository = getRepository(Inconsistencia);

        const inconsistencia = await inconsistenciaRepository.find({});
      

        return inconsistencia;
    }
}

export default LoadInconsistenciaService;