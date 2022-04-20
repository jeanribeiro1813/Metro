import { getCustomRepository, getRepository } from 'typeorm'

import Pilote from '../../typeorm/entities/Pilote'
import PilotesRepository from '../../typeorm/repositories/PilotesRepository'

interface IRequestDTO {
    actividad: string;
}

class LoadPilotesFilterService{
    public async filter ({actividad}:IRequestDTO): Promise<Pilote[] | undefined> {
        
        const loadService =  getRepository(Pilote);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' actividad :: text  ilike :actividad', {actividad: `%${actividad}%`}).getMany();

        return cargoRepo;
    }
}

export default LoadPilotesFilterService;