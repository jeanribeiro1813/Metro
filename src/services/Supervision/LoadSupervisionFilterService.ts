import { getCustomRepository, getRepository } from 'typeorm'

import Supervision from '../../typeorm/entities/Supervision'
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'

interface IRequestDTO {
    actividad: string;
}

class LoadSupervisionFilterService{
    public async filter ({actividad}:IRequestDTO): Promise<Supervision[] | undefined> {
        
        const loadService =  getRepository(Supervision);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' actividad :: text  ilike :actividad', {actividad: `%${actividad}%`}).getMany();

        return cargoRepo;
    }
}

export default LoadSupervisionFilterService;