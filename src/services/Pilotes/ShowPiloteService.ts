import { getCustomRepository } from 'typeorm'

import Pilote from '../../typeorm/entities/Pilote'
import PilotesRepository from '../../typeorm/repositories/PilotesRepository'

interface IRequestDTO {
    id: string;
}

class ShowPiloteService{
    public async execute ({id}:IRequestDTO): Promise<Pilote | undefined> {
        
        const pilotesRepository = getCustomRepository(PilotesRepository);

        const pilote = await pilotesRepository.findById(id);

        return pilote;
    }
}

export default ShowPiloteService;