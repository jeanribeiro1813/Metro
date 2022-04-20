import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Pilote from '../../typeorm/entities/Pilote'
import PilotesRepository from '../../typeorm/repositories/PilotesRepository'

interface IRequestDTO {
    id: string;
}

class ShowPiloteService{
    public async remove ({id}:IRequestDTO): Promise< void> {
        
        const pilotesRepository = getRepository(Pilote);

        const pilote = await pilotesRepository.findOne(id);

        if (!pilote) {
            throw new AppError('Não Existe ',402);
          }

        await pilotesRepository.remove(pilote);

    }
}

export default ShowPiloteService;