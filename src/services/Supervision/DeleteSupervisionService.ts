import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Supervision from '../../typeorm/entities/Supervision'
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'

interface IRequestDTO {
    id: string;
}

class ShowSupervisionService{
    public async remove ({id}:IRequestDTO): Promise< void> {
        
        const supervisionRepository = getRepository(Supervision);

        const supervision = await supervisionRepository.findOne(id);

        if (!supervision) {
            throw new AppError('Não Existe ',402);
          }

        await supervisionRepository.remove(supervision);

    }
}

export default ShowSupervisionService;