import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import InconsistenciaRepository from '../../typeorm/repositories/InconsistenciaRepository'


interface IRequests{
    id:string;
}

class DeleteInconsistenciaService{

    public async remove ({id}:IRequests): Promise< void > {
        
        const inconsistenciaRepository = getCustomRepository(InconsistenciaRepository);

        const inconsistencia = await inconsistenciaRepository.findById(id);

        if (!inconsistencia) {
            throw new AppError('Não Existe ',402);
          }

        await inconsistenciaRepository.remove(inconsistencia);

    }
}

export default DeleteInconsistenciaService;