import { getCustomRepository } from 'typeorm'

import Inconsistencia from '../../typeorm/entities/Inconsistencia'
import InconsistenciaRepository from '../../typeorm/repositories/InconsistenciaRepository'

interface IRequestDTO {
    id: string;
}

class ShowIconsistenciaService{
    public async execute ({id}:IRequestDTO): Promise<Inconsistencia | undefined> {
        
        const iconsistenciaRepository = getCustomRepository(InconsistenciaRepository);

        const inconsistencia = await iconsistenciaRepository.findById(id);

        return inconsistencia;
    }
}

export default ShowIconsistenciaService;