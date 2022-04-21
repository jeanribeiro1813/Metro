import { getCustomRepository, getRepository } from 'typeorm'

import Inconsistencia from '../../typeorm/entities/Inconsistencia'

interface IRequestDTO {
    id: string;
}

class LoadInconsistenciaFilterService{
    public async filter ({id}:IRequestDTO): Promise<Inconsistencia[] | undefined> {
        
        const loadService =  getRepository(Inconsistencia);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' id :: text  ilike :id', {id: `%${id}%`}).getMany();

        return cargoRepo;
    }
}

export default LoadInconsistenciaFilterService;